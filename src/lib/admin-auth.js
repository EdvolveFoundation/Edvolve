import bcrypt from "bcryptjs";
import crypto from "crypto";
import { query } from "@/lib/db";
import {
  assertEmailDeliveryConfigured,
  sendAdminOtpEmail,
} from "@/lib/email";

const ADMIN_EMAIL = "admin@edvolvefoundation.org";
const OTP_LENGTH = 6;
const OTP_TTL_MINUTES = 10;
const OTP_TTL_MS = OTP_TTL_MINUTES * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;
const OTP_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const OTP_DIGITS = "23456789";
const OTP_LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

export class AuthFlowError extends Error {
  constructor(code, message, status = 400) {
    super(message);
    this.name = "AuthFlowError";
    this.code = code;
    this.status = status;
  }
}

export function getConfiguredAdminEmail() {
  return (process.env.ADMIN_EMAIL || ADMIN_EMAIL).toLowerCase();
}

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizeOtp(code) {
  return String(code || "").trim().toUpperCase().replace(/\s+/g, "");
}

function assertAllowedAdminEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (normalizedEmail !== getConfiguredAdminEmail()) {
    throw new AuthFlowError(
      "INVALID_CREDENTIALS",
      "Invalid email or password.",
      401
    );
  }

  return normalizedEmail;
}

export function validateAdminPassword(password) {
  const value = String(password || "");

  if (value.length < 10) {
    return "Password must be at least 10 characters.";
  }

  if (!/[a-z]/.test(value)) {
    return "Password must include a lowercase letter.";
  }

  if (!/[A-Z]/.test(value)) {
    return "Password must include an uppercase letter.";
  }

  if (!/[0-9]/.test(value)) {
    return "Password must include a number.";
  }

  if (!/[^A-Za-z0-9]/.test(value)) {
    return "Password must include a symbol.";
  }

  return null;
}

function getOtpSecret() {
  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not configured.");
  }

  return process.env.AUTH_SECRET;
}

function hashOtp(code) {
  return crypto
    .createHmac("sha256", getOtpSecret())
    .update(normalizeOtp(code))
    .digest("hex");
}

function safeHashEqual(left, right) {
  const leftBuffer = Buffer.from(left || "", "hex");
  const rightBuffer = Buffer.from(right || "", "hex");

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function randomChar(alphabet) {
  const index = crypto.randomInt(0, alphabet.length);
  return alphabet[index];
}

function shuffle(value) {
  const chars = value.split("");

  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = crypto.randomInt(0, index + 1);
    [chars[index], chars[swapIndex]] = [chars[swapIndex], chars[index]];
  }

  return chars.join("");
}

export function generateOtpCode() {
  let code = randomChar(OTP_LETTERS) + randomChar(OTP_DIGITS);

  while (code.length < OTP_LENGTH) {
    code += randomChar(OTP_ALPHABET);
  }

  return shuffle(code);
}

export async function getAdminAuthStatus() {
  const email = getConfiguredAdminEmail();
  const result = await query(
    `
      select password_hash is not null as password_configured
      from admin_accounts
      where email = $1
      limit 1
    `,
    [email]
  );

  return {
    email,
    passwordConfigured: Boolean(
      result.rows[0]?.password_configured
    ),
  };
}

async function getAdminAccount(email) {
  const result = await query(
    `
      select email, password_hash
      from admin_accounts
      where email = $1
      limit 1
    `,
    [email]
  );

  return result.rows[0] || null;
}

async function assertPasswordIsConfigured(email) {
  const account = await getAdminAccount(email);

  if (!account?.password_hash) {
    throw new AuthFlowError(
      "PASSWORD_NOT_SET",
      "Admin password has not been set.",
      409
    );
  }

  return account;
}

async function assertPasswordMatches(password, hash) {
  const isValid = await bcrypt.compare(String(password || ""), hash);

  if (!isValid) {
    throw new AuthFlowError(
      "INVALID_CREDENTIALS",
      "Invalid email or password.",
      401
    );
  }
}

async function createOtp({ email, purpose, passwordHash = null }) {
  const code = generateOtpCode();
  const id = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await query(
    `
      update admin_otps
      set consumed_at = now()
      where email = $1
        and purpose = $2
        and consumed_at is null
    `,
    [email, purpose]
  );

  await query(
    `
      insert into admin_otps (
        id,
        email,
        purpose,
        code_hash,
        password_hash,
        expires_at
      )
      values ($1, $2, $3, $4, $5, $6)
    `,
    [id, email, purpose, hashOtp(code), passwordHash, expiresAt]
  );

  return {
    code,
    expiresInMinutes: OTP_TTL_MINUTES,
  };
}

async function verifyOtp({ email, purpose, code }) {
  const normalizedCode = normalizeOtp(code);

  if (!/^[A-Z0-9]{6}$/.test(normalizedCode)) {
    throw new AuthFlowError(
      "INVALID_OTP",
      "Enter the 6-character code sent to the admin email.",
      400
    );
  }

  const result = await query(
    `
      select *
      from admin_otps
      where email = $1
        and purpose = $2
        and consumed_at is null
      order by created_at desc
      limit 1
    `,
    [email, purpose]
  );

  const otp = result.rows[0];

  if (!otp) {
    throw new AuthFlowError(
      "OTP_NOT_FOUND",
      "Request a new verification code.",
      400
    );
  }

  if (new Date(otp.expires_at).getTime() < Date.now()) {
    await query(
      "update admin_otps set consumed_at = now() where id = $1",
      [otp.id]
    );
    throw new AuthFlowError(
      "OTP_EXPIRED",
      "Verification code has expired. Request a new code.",
      400
    );
  }

  if (otp.attempts >= OTP_MAX_ATTEMPTS) {
    await query(
      "update admin_otps set consumed_at = now() where id = $1",
      [otp.id]
    );
    throw new AuthFlowError(
      "OTP_LOCKED",
      "Too many incorrect attempts. Request a new code.",
      429
    );
  }

  if (!safeHashEqual(hashOtp(normalizedCode), otp.code_hash)) {
    await query(
      `
        update admin_otps
        set
          attempts = attempts + 1,
          consumed_at = case
            when attempts + 1 >= $2 then now()
            else consumed_at
          end
        where id = $1
      `,
      [otp.id, OTP_MAX_ATTEMPTS]
    );
    throw new AuthFlowError(
      "INVALID_OTP",
      "Invalid verification code.",
      400
    );
  }

  const consumed = await query(
    `
      update admin_otps
      set consumed_at = now()
      where id = $1
        and consumed_at is null
      returning *
    `,
    [otp.id]
  );

  if (!consumed.rows[0]) {
    throw new AuthFlowError(
      "OTP_CONSUMED",
      "Verification code has already been used.",
      400
    );
  }

  return consumed.rows[0];
}

async function sendOtp({ email, purpose, passwordHash }) {
  assertEmailDeliveryConfigured();

  const otp = await createOtp({
    email,
    purpose,
    passwordHash,
  });

  await sendAdminOtpEmail({
    to: email,
    code: otp.code,
    purpose,
    expiresInMinutes: otp.expiresInMinutes,
  });
}

export async function requestSetupOtp({ email, password }) {
  const adminEmail = assertAllowedAdminEmail(email);
  const status = await getAdminAuthStatus();

  if (status.passwordConfigured) {
    throw new AuthFlowError(
      "PASSWORD_ALREADY_SET",
      "Admin password has already been set.",
      409
    );
  }

  const passwordError = validateAdminPassword(password);

  if (passwordError) {
    throw new AuthFlowError("WEAK_PASSWORD", passwordError, 400);
  }

  const passwordHash = await bcrypt.hash(String(password), 12);

  await sendOtp({
    email: adminEmail,
    purpose: "setup",
    passwordHash,
  });
}

export async function verifySetupOtp({ email, otp }) {
  const adminEmail = assertAllowedAdminEmail(email);
  const status = await getAdminAuthStatus();

  if (status.passwordConfigured) {
    throw new AuthFlowError(
      "PASSWORD_ALREADY_SET",
      "Admin password has already been set.",
      409
    );
  }

  const verifiedOtp = await verifyOtp({
    email: adminEmail,
    purpose: "setup",
    code: otp,
  });

  if (!verifiedOtp.password_hash) {
    throw new Error("Setup OTP is missing password hash.");
  }

  await query(
    `
      insert into admin_accounts (
        email,
        password_hash,
        password_set_at
      )
      values ($1, $2, now())
      on conflict (email)
      do update set
        password_hash = excluded.password_hash,
        password_set_at = now()
    `,
    [adminEmail, verifiedOtp.password_hash]
  );
}

export async function requestLoginOtp({ email, password }) {
  const adminEmail = assertAllowedAdminEmail(email);
  const account = await assertPasswordIsConfigured(adminEmail);

  await assertPasswordMatches(password, account.password_hash);

  await sendOtp({
    email: adminEmail,
    purpose: "login",
  });
}

export async function verifyLoginCredentials({
  email,
  password,
  otp,
}) {
  const adminEmail = assertAllowedAdminEmail(email);
  const account = await assertPasswordIsConfigured(adminEmail);

  await assertPasswordMatches(password, account.password_hash);

  await verifyOtp({
    email: adminEmail,
    purpose: "login",
    code: otp,
  });

  return {
    id: "admin",
    email: adminEmail,
    name: "Edvolve Admin",
    role: "admin",
  };
}

export async function requestPasswordResetOtp({ email }) {
  const adminEmail = assertAllowedAdminEmail(email);

  await assertPasswordIsConfigured(adminEmail);

  await sendOtp({
    email: adminEmail,
    purpose: "password_reset",
  });
}

export async function verifyPasswordResetOtp({
  email,
  otp,
  password,
}) {
  const adminEmail = assertAllowedAdminEmail(email);

  await assertPasswordIsConfigured(adminEmail);

  const passwordError = validateAdminPassword(password);

  if (passwordError) {
    throw new AuthFlowError("WEAK_PASSWORD", passwordError, 400);
  }

  await verifyOtp({
    email: adminEmail,
    purpose: "password_reset",
    code: otp,
  });

  const passwordHash = await bcrypt.hash(String(password), 12);

  await query(
    `
      update admin_accounts
      set
        password_hash = $2,
        password_set_at = now()
      where email = $1
    `,
    [adminEmail, passwordHash]
  );
}

export function authErrorResponse(error) {
  if (
    error instanceof AuthFlowError ||
    error?.name === "EmailDeliveryError"
  ) {
    return Response.json(
      {
        error: error.message,
        code: error.code,
      },
      {
        status: error.status,
      }
    );
  }

  console.error(error);

  return Response.json(
    {
      error: "Unable to process authentication request.",
    },
    {
      status: 500,
    }
  );
}

import { Resend } from "resend";

const DEFAULT_FROM = "Edvolve Foundation <onboarding@resend.dev>";

export class EmailDeliveryError extends Error {
  constructor(code, message, status = 503) {
    super(message);
    this.name = "EmailDeliveryError";
    this.code = code;
    this.status = status;
  }
}

function getResendClient() {
  const apiKey = assertEmailDeliveryConfigured();

  return new Resend(apiKey);
}

export function assertEmailDeliveryConfigured() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new EmailDeliveryError(
      "EMAIL_NOT_CONFIGURED",
      "Email delivery is not configured."
    );
  }

  return apiKey;
}

function getOtpSubject(purpose) {
  if (purpose === "password_reset") {
    return "Reset your Edvolve admin password";
  }

  if (purpose === "setup") {
    return "Set up your Edvolve admin password";
  }

  return "Your Edvolve admin login code";
}

function getOtpIntro(purpose) {
  if (purpose === "password_reset") {
    return "Use this code to reset the Edvolve admin password.";
  }

  if (purpose === "setup") {
    return "Use this code to finish setting up the Edvolve admin password.";
  }

  return "Use this code to finish signing in to the Edvolve admin dashboard.";
}

export async function sendAdminOtpEmail({
  to,
  code,
  purpose,
  expiresInMinutes,
}) {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM || DEFAULT_FROM;
  const subject = getOtpSubject(purpose);
  const intro = getOtpIntro(purpose);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h1 style="font-size: 20px; margin: 0 0 16px;">${subject}</h1>
        <p style="margin: 0 0 16px;">${intro}</p>
        <p style="font-size: 28px; font-weight: 700; letter-spacing: 6px; margin: 24px 0;">${code}</p>
        <p style="margin: 0 0 16px;">This code expires in ${expiresInMinutes} minutes.</p>
        <p style="margin: 0; color: #6b7280;">If you did not request this, you can ignore this email.</p>
      </div>
    `,
    text: `${intro}\n\nCode: ${code}\n\nThis code expires in ${expiresInMinutes} minutes.`,
  });

  if (error) {
    throw new EmailDeliveryError(
      "EMAIL_DELIVERY_FAILED",
      "Unable to send verification email."
    );
  }
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const DEFAULT_ADMIN_EMAIL = "admin@edvolvefoundation.org";
const DEFAULT_ADMIN_CALLBACK_URL = "/admin";

const initialForm = {
  email: DEFAULT_ADMIN_EMAIL,
  password: "",
  confirmPassword: "",
  otp: "",
};

async function postJson(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error || "Request failed.");
    error.code = data.code;
    throw error;
  }

  return data;
}

function normalizeAdminCallbackUrl(value) {
  if (!value) {
    return DEFAULT_ADMIN_CALLBACK_URL;
  }

  try {
    const url = new URL(value, window.location.origin);

    if (url.origin !== window.location.origin && /^https?:/i.test(value)) {
      return DEFAULT_ADMIN_CALLBACK_URL;
    }

    if (
      !url.pathname.startsWith("/admin") ||
      url.pathname === "/admin/login"
    ) {
      return DEFAULT_ADMIN_CALLBACK_URL;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return DEFAULT_ADMIN_CALLBACK_URL;
  }
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [stage, setStage] = useState("loading");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    let ignore = false;

    async function loadStatus() {
      try {
        const response = await fetch("/api/admin/auth/status");
        const status = await response.json();

        if (ignore) {
          return;
        }

        setFormData((prev) => ({
          ...prev,
          email: status.email || DEFAULT_ADMIN_EMAIL,
        }));
        setStage(
          status.passwordConfigured ? "credentials" : "setup"
        );
      } catch {
        if (!ignore) {
          setStage("credentials");
          setError("Unable to load admin auth status.");
        }
      }
    }

    loadStatus();

    return () => {
      ignore = true;
    };
  }, []);

  const heading = useMemo(() => {
    if (stage === "setup" || stage === "setupOtp") {
      return "Set Admin Password";
    }

    if (stage === "resetRequest" || stage === "resetVerify") {
      return "Reset Password";
    }

    if (stage === "otp") {
      return "Verify Login";
    }

    return "Edvolve Admin";
  }, [stage]);

  const subheading = useMemo(() => {
    if (stage === "setup" || stage === "setupOtp") {
      return "First-time secure setup";
    }

    if (stage === "resetRequest" || stage === "resetVerify") {
      return "Email verification required";
    }

    if (stage === "otp") {
      return "Enter the code sent to the admin email";
    }

    return "Secure Dashboard Access";
  }, [stage]);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const clearFeedback = () => {
    setError("");
    setMessage("");
  };

  const getCallbackUrl = () => {
    const params = new URLSearchParams(window.location.search);

    return normalizeAdminCallbackUrl(params.get("callbackUrl"));
  };

  const ensurePasswordsMatch = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const requestLoginOtp = async () => {
    await postJson("/api/admin/auth/login/request-otp", {
      email: formData.email,
      password: formData.password,
    });
  };

  const handleCredentialsSubmit = async (event) => {
    event.preventDefault();
    clearFeedback();
    setIsSubmitting(true);

    try {
      await requestLoginOtp();
      setFormData((prev) => ({
        ...prev,
        otp: "",
      }));
      setStage("otp");
      setMessage("Verification code sent.");
    } catch (requestError) {
      if (requestError.code === "PASSWORD_NOT_SET") {
        setStage("setup");
        setError("Create the admin password first.");
      } else {
        setError(
          requestError.message || "Invalid email or password."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    clearFeedback();
    setIsSubmitting(true);

    const callbackUrl = getCallbackUrl();

    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      otp: formData.otp,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (!response || response.error) {
      setError("Invalid or expired verification code.");
      return;
    }

    router.replace(callbackUrl);
    router.refresh();
  };

  const handleResendLoginOtp = async () => {
    clearFeedback();
    setIsSubmitting(true);

    try {
      await requestLoginOtp();
      setMessage("New verification code sent.");
    } catch (requestError) {
      setError(
        requestError.message || "Unable to send verification code."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestSetupOtp = async () => {
    await postJson("/api/admin/auth/setup/request", {
      email: formData.email,
      password: formData.password,
    });
  };

  const handleSetupSubmit = async (event) => {
    event.preventDefault();
    clearFeedback();

    if (!ensurePasswordsMatch()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await requestSetupOtp();
      setFormData((prev) => ({
        ...prev,
        otp: "",
      }));
      setStage("setupOtp");
      setMessage("Setup code sent.");
    } catch (requestError) {
      setError(
        requestError.message || "Unable to send setup code."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetupOtpSubmit = async (event) => {
    event.preventDefault();
    clearFeedback();
    setIsSubmitting(true);

    try {
      await postJson("/api/admin/auth/setup/verify", {
        email: formData.email,
        otp: formData.otp,
      });
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
        otp: "",
      }));
      setStage("credentials");
      setMessage("Password set. Sign in to receive a login code.");
    } catch (requestError) {
      setError(
        requestError.message || "Unable to verify setup code."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendSetupOtp = async () => {
    clearFeedback();

    if (!ensurePasswordsMatch()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await requestSetupOtp();
      setMessage("New setup code sent.");
    } catch (requestError) {
      setError(
        requestError.message || "Unable to send setup code."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetRequest = async (event) => {
    event.preventDefault();
    clearFeedback();
    setIsSubmitting(true);

    try {
      await postJson("/api/admin/auth/password-reset/request", {
        email: formData.email,
      });
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
        otp: "",
      }));
      setStage("resetVerify");
      setMessage("Password reset code sent.");
    } catch (requestError) {
      setError(
        requestError.message || "Unable to send reset code."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetVerify = async (event) => {
    event.preventDefault();
    clearFeedback();

    if (!ensurePasswordsMatch()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await postJson("/api/admin/auth/password-reset/verify", {
        email: formData.email,
        otp: formData.otp,
        password: formData.password,
      });
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
        otp: "",
      }));
      setStage("credentials");
      setMessage("Password reset. Sign in with the new password.");
    } catch (requestError) {
      setError(
        requestError.message || "Unable to reset password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendResetOtp = async () => {
    clearFeedback();
    setIsSubmitting(true);

    try {
      await postJson("/api/admin/auth/password-reset/request", {
        email: formData.email,
      });
      setMessage("New reset code sent.");
    } catch (requestError) {
      setError(
        requestError.message || "Unable to send reset code."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderEmailField = () => (
    <div>
      <label className="block mb-2 text-sm text-gray-200">
        Email Address
      </label>

      <div className="relative">
        <Mail
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="email"
          name="email"
          required
          readOnly
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="
            w-full
            bg-white/10
            border
            border-white/20
            rounded-xl
            pl-11
            pr-4
            py-3
            text-white
            outline-none
            focus:ring-2
            focus:ring-white
          "
        />
      </div>
    </div>
  );

  const renderPasswordField = ({
    label = "Password",
    name = "password",
    autoComplete = "current-password",
    placeholder = "Password",
  } = {}) => (
    <div>
      <label className="block mb-2 text-sm text-gray-200">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          required
          value={formData[name]}
          onChange={handleChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="
            w-full
            bg-white/10
            border
            border-white/20
            rounded-xl
            pl-11
            pr-12
            py-3
            text-white
            placeholder:text-gray-400
            outline-none
            focus:ring-2
            focus:ring-white
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  const renderOtpField = () => (
    <div>
      <label className="block mb-2 text-sm text-gray-200">
        Verification Code
      </label>

      <div className="relative">
        <KeyRound
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          name="otp"
          required
          inputMode="text"
          maxLength={6}
          value={formData.otp}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              otp: event.target.value.toUpperCase(),
            }))
          }
          autoComplete="one-time-code"
          placeholder="A1B2C3"
          className="
            w-full
            bg-white/10
            border
            border-white/20
            rounded-xl
            pl-11
            pr-4
            py-3
            text-white
            uppercase
            tracking-[0.35em]
            placeholder:text-gray-400
            outline-none
            focus:ring-2
            focus:ring-white
          "
        />
      </div>
    </div>
  );

  const renderSubmitButton = (label, pendingLabel) => (
    <button
      type="submit"
      disabled={isSubmitting}
      className="
        w-full
        bg-white
        text-black
        py-3
        rounded-xl
        font-semibold
        hover:bg-gray-200
        transition
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {isSubmitting ? pendingLabel : label}
    </button>
  );

  const renderSecondaryButton = ({
    label,
    onClick,
    icon: Icon,
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={isSubmitting}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        text-sm
        text-gray-200
        hover:text-white
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );

  const renderForm = () => {
    if (stage === "loading") {
      return (
        <div className="px-8 pb-8">
          <div className="flex items-center justify-center py-10 text-gray-200">
            <RefreshCw className="mr-3 animate-spin" size={18} />
            Loading
          </div>
        </div>
      );
    }

    if (stage === "setup") {
      return (
        <form
          onSubmit={handleSetupSubmit}
          className="px-8 pb-8 space-y-5"
        >
          {renderFeedback()}
          {renderEmailField()}
          {renderPasswordField({
            label: "Create Password",
            autoComplete: "new-password",
            placeholder: "New password",
          })}
          {renderPasswordField({
            label: "Confirm Password",
            name: "confirmPassword",
            autoComplete: "new-password",
            placeholder: "Confirm password",
          })}
          {renderSubmitButton("Send Setup Code", "Sending...")}
        </form>
      );
    }

    if (stage === "setupOtp") {
      return (
        <form
          onSubmit={handleSetupOtpSubmit}
          className="px-8 pb-8 space-y-5"
        >
          {renderFeedback()}
          {renderEmailField()}
          {renderOtpField()}
          {renderSubmitButton("Set Password", "Verifying...")}
          <div className="flex items-center justify-between">
            {renderSecondaryButton({
              label: "Back",
              onClick: () => setStage("setup"),
              icon: ArrowLeft,
            })}
            {renderSecondaryButton({
              label: "Resend code",
              onClick: handleResendSetupOtp,
              icon: RefreshCw,
            })}
          </div>
        </form>
      );
    }

    if (stage === "otp") {
      return (
        <form
          onSubmit={handleOtpSubmit}
          className="px-8 pb-8 space-y-5"
        >
          {renderFeedback()}
          {renderEmailField()}
          {renderOtpField()}
          {renderSubmitButton("Verify & Login", "Verifying...")}
          <div className="flex items-center justify-between">
            {renderSecondaryButton({
              label: "Back",
              onClick: () => setStage("credentials"),
              icon: ArrowLeft,
            })}
            {renderSecondaryButton({
              label: "Resend code",
              onClick: handleResendLoginOtp,
              icon: RefreshCw,
            })}
          </div>
        </form>
      );
    }

    if (stage === "resetRequest") {
      return (
        <form
          onSubmit={handleResetRequest}
          className="px-8 pb-8 space-y-5"
        >
          {renderFeedback()}
          {renderEmailField()}
          {renderSubmitButton("Send Reset Code", "Sending...")}
          {renderSecondaryButton({
            label: "Back to login",
            onClick: () => setStage("credentials"),
            icon: ArrowLeft,
          })}
        </form>
      );
    }

    if (stage === "resetVerify") {
      return (
        <form
          onSubmit={handleResetVerify}
          className="px-8 pb-8 space-y-5"
        >
          {renderFeedback()}
          {renderEmailField()}
          {renderOtpField()}
          {renderPasswordField({
            label: "New Password",
            autoComplete: "new-password",
            placeholder: "New password",
          })}
          {renderPasswordField({
            label: "Confirm Password",
            name: "confirmPassword",
            autoComplete: "new-password",
            placeholder: "Confirm password",
          })}
          {renderSubmitButton("Reset Password", "Resetting...")}
          <div className="flex items-center justify-between">
            {renderSecondaryButton({
              label: "Back",
              onClick: () => setStage("resetRequest"),
              icon: ArrowLeft,
            })}
            {renderSecondaryButton({
              label: "Resend code",
              onClick: handleResendResetOtp,
              icon: RefreshCw,
            })}
          </div>
        </form>
      );
    }

    return (
      <form
        onSubmit={handleCredentialsSubmit}
        className="px-8 pb-8 space-y-5"
      >
        {renderFeedback()}
        {renderEmailField()}
        {renderPasswordField()}
        {renderSubmitButton("Continue", "Checking...")}
        <div className="flex justify-end">
          {renderSecondaryButton({
            label: "Forgot password?",
            onClick: () => {
              clearFeedback();
              setStage("resetRequest");
            },
          })}
        </div>
      </form>
    );
  };

  const renderFeedback = () => (
    <>
      {error && (
        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-red-300/40
            bg-red-500/15
            p-4
            text-sm
            text-red-100
          "
        >
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {message && (
        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-emerald-300/40
            bg-emerald-500/15
            p-4
            text-sm
            text-emerald-100
          "
        >
          <ShieldCheck size={18} />
          {message}
        </div>
      )}
    </>
  );

  return (
    <main
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        p-6
        bg-cover
        bg-center
      "
      style={{
        backgroundImage: "url('/edu1.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black/75" />

      <section
        className="
          relative
          z-10
          w-full
          max-w-md
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          shadow-2xl
          overflow-hidden
          text-white
        "
      >
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold">{heading}</h1>

          <p className="text-gray-300 mt-3">{subheading}</p>
        </div>

        {renderForm()}
      </section>
    </main>
  );
}

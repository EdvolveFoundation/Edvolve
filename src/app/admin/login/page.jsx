"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const getCallbackUrl = () => {
    const params = new URLSearchParams(
      window.location.search
    );

    return params.get("callbackUrl") || "/admin";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await signIn(
      "credentials",
      {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: getCallbackUrl(),
      }
    );

    setIsSubmitting(false);

    if (!response || response.error) {
      setError("Invalid email or password.");
      return;
    }

    router.replace(response.url || "/admin");
    router.refresh();
  };

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
          <h1 className="text-4xl font-bold">
            Edvolve Admin
          </h1>

          <p className="text-gray-300 mt-3">
            Secure Dashboard Access
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-8 pb-8 space-y-5"
        >
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

          <div>
            <label className="block mb-2 text-sm text-gray-200">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="admin@edvolvefoundation.org"
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
                  placeholder:text-gray-400
                  outline-none
                  focus:ring-2
                  focus:ring-white
                "
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-200">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Password"
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
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

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
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

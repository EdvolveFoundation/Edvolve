import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60;

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  otp: z.string().min(1),
});

async function authorizeAdmin(credentials) {
  const parsed = credentialsSchema.safeParse(credentials);

  if (!parsed.success) {
    return null;
  }

  try {
    const { verifyLoginCredentials } = await import(
      "@/lib/admin-auth"
    );

    return verifyLoginCredentials(parsed.data);
  } catch (error) {
    if (error?.name !== "AuthFlowError") {
      console.error(error);
    }
    return null;
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE_SECONDS,
    updateAge: 60 * 60,
  },
  jwt: {
    maxAge: SESSION_MAX_AGE_SECONDS,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
        otp: {
          label: "Verification code",
          type: "text",
        },
      },
      authorize: authorizeAdmin,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },
  },
});

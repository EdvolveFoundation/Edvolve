import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

async function authorizeAdmin(credentials) {
  const parsed = credentialsSchema.safeParse(credentials);

  if (!parsed.success) {
    return null;
  }

  const configuredEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const configuredPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!configuredEmail || !configuredPasswordHash) {
    console.error("Admin authentication environment variables are missing.");
    return null;
  }

  const email = parsed.data.email.toLowerCase();

  if (email !== configuredEmail) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(
    parsed.data.password,
    configuredPasswordHash
  );

  if (!isValidPassword) {
    return null;
  }

  return {
    id: "admin",
    email: configuredEmail,
    name: "Edvolve Admin",
    role: "admin",
  };
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

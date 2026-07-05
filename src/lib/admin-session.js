import { auth } from "@/auth";

export async function getAdminSession() {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return null;
  }

  return session;
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  return null;
}

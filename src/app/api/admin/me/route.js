import { getAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return Response.json(
      {
        user: null,
      },
      {
        status: 401,
      }
    );
  }

  return Response.json({
    user: session.user,
  });
}

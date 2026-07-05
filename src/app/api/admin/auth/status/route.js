import { getAdminAuthStatus } from "@/lib/admin-auth";

export async function GET() {
  const status = await getAdminAuthStatus();

  return Response.json(status);
}

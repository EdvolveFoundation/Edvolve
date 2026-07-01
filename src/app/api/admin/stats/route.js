import { requireAdminSession } from "@/lib/admin-session";
import { handleRouteError, json } from "@/lib/api-utils";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const result = await query(
      `select
        (select count(*)::int from blogs) as blogs,
        (select count(*)::int from staff_members) as staffs,
        (select count(*)::int from contact_messages) as messages,
        (select count(*)::int from events) as events,
        (select count(*)::int from registrations) as registrations`
    );

    return json({
      stats: result.rows[0],
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

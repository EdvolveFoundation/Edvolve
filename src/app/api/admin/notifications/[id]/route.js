import { requireAdminSession } from "@/lib/admin-session";
import { handleRouteError, json, notFound, noContent } from "@/lib/api-utils";
import { query } from "@/lib/db";
import { serializeAdminNotification } from "@/lib/serializers";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await params;

  try {
    const result = await query(
      `update admin_notifications
       set read = true,
           read_at = coalesce(read_at, now())
       where id = $1
       returning *`,
      [id]
    );

    if (!result.rowCount) {
      return notFound("Notification not found.");
    }

    return json({
      notification: serializeAdminNotification(result.rows[0]),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(request, { params }) {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await params;

  try {
    await query(`delete from admin_notifications where id = $1`, [id]);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}

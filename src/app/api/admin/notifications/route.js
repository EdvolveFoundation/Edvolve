import { requireAdminSession } from "@/lib/admin-session";
import {
  getUnreadAdminNotificationCount,
  listAdminNotifications,
} from "@/lib/admin-notifications";
import { handleRouteError, json } from "@/lib/api-utils";
import { query } from "@/lib/db";
import { serializeAdminNotification } from "@/lib/serializers";

export const runtime = "nodejs";

export async function GET(request) {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { searchParams } = new URL(request.url);
    const [notifications, unreadCount] = await Promise.all([
      listAdminNotifications(searchParams.get("limit")),
      getUnreadAdminNotificationCount(),
    ]);

    return json({
      notifications: notifications.map(serializeAdminNotification),
      unreadCount,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH() {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const result = await query(
      `update admin_notifications
       set read = true,
           read_at = coalesce(read_at, now())
       where read = false
       returning *`
    );

    return json({
      notifications: result.rows.map(serializeAdminNotification),
      unreadCount: 0,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

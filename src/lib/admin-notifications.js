import { query } from "@/lib/db";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export function normalizeNotificationLimit(value) {
  const limit = Number.parseInt(value, 10);

  if (!Number.isFinite(limit) || limit < 1) {
    return DEFAULT_LIMIT;
  }

  return Math.min(limit, MAX_LIMIT);
}

export async function createAdminNotification({
  type,
  title,
  message,
  href = "",
  metadata = {},
}) {
  try {
    const result = await query(
      `insert into admin_notifications (
        id,
        type,
        title,
        message,
        href,
        metadata
      )
      values ($1,$2,$3,$4,$5,$6)
      returning *`,
      [
        crypto.randomUUID(),
        type,
        title,
        message,
        href || null,
        JSON.stringify(metadata || {}),
      ]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Unable to create admin notification.", error);
    return null;
  }
}

export async function listAdminNotifications(limit = DEFAULT_LIMIT) {
  const result = await query(
    `select *
     from admin_notifications
     order by created_at desc
     limit $1`,
    [normalizeNotificationLimit(limit)]
  );

  return result.rows;
}

export async function getUnreadAdminNotificationCount() {
  const result = await query(
    `select count(*)::int as count
     from admin_notifications
     where read = false`
  );

  return result.rows[0]?.count || 0;
}

export function getContentHref(type, id) {
  if (!id) {
    return "/admin";
  }

  if (type === "blog") {
    return `/admin/blog/edit/${id}`;
  }

  if (type === "staff") {
    return `/admin/staff/edit/${id}`;
  }

  if (type === "report") {
    return "/admin/ReportPage";
  }

  if (type === "event") {
    return "/admin/events";
  }

  return "/admin";
}

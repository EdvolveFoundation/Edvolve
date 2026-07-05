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
    const countsResult = await query(
      `select
        (select count(*)::int from blogs) as blogs,
        (select count(*)::int from staff_members) as staffs,
        (select count(*)::int from contact_messages) as messages,
        (select count(*)::int from events) as events,
        (select count(*)::int from registrations) as registrations`
    );

    const monthlyResult = await query(
      `with months as (
        select
          date_trunc('month', current_date) - (interval '1 month' * series.month_offset) as month_start
        from generate_series(5, 0, -1) as series(month_offset)
      )
      select
        trim(to_char(month_start, 'Mon')) as month,
        (select count(*)::int from blogs where created_at >= month_start and created_at < month_start + interval '1 month') as blogs,
        (select count(*)::int from contact_messages where created_at >= month_start and created_at < month_start + interval '1 month') as messages,
        (select count(*)::int from events where created_at >= month_start and created_at < month_start + interval '1 month') as events,
        (select count(*)::int from registrations where created_at >= month_start and created_at < month_start + interval '1 month') as registrations
      from months
      order by month_start`
    );

    return json({
      stats: {
        ...countsResult.rows[0],
        monthlyActivity: monthlyResult.rows,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  badRequest,
  handleRouteError,
  json,
  noContent,
  notFound,
  readJson,
  validate,
} from "@/lib/api-utils";
import {
  createAdminNotification,
  getContentHref,
} from "@/lib/admin-notifications";
import { query } from "@/lib/db";
import { serializeReport } from "@/lib/serializers";

export const runtime = "nodejs";

const updateReportSchema = z.object({
  title: z.string().trim().min(2).optional(),
  year: z.string().trim().min(4).optional(),
  category: z.string().trim().min(2).optional(),
  description: z.string().trim().optional(),
  link: z.string().trim().optional(),
});

export async function PATCH(request, { params }) {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await params;
  const { data: body, response } = await readJson(request);

  if (response) {
    return response;
  }

  const validation = validate(updateReportSchema, body);

  if (validation.response) {
    return validation.response;
  }

  const data = validation.data;
  const updates = [];
  const values = [];

  function add(column, value) {
    values.push(value);
    updates.push(`${column} = $${values.length}`);
  }

  if (data.title !== undefined) add("title", data.title);
  if (data.year !== undefined) add("year", data.year);
  if (data.category !== undefined) add("category", data.category);
  if (data.description !== undefined) add("description", data.description);
  if (data.link !== undefined) add("link", data.link);

  if (!updates.length) {
    return badRequest("No supported fields were provided.");
  }

  values.push(id);

  try {
    const result = await query(
      `update reports
       set ${updates.join(", ")}
       where id = $${values.length}
       returning *`,
      values
    );

    if (!result.rowCount) {
      return notFound("Report not found.");
    }

    const report = serializeReport(result.rows[0]);

    await createAdminNotification({
      type: "report",
      title: "Report updated",
      message: `${report.title} was updated.`,
      href: getContentHref("report", report.id),
      metadata: {
        reportId: report.id,
        year: report.year,
        category: report.category,
      },
    });

    return json({
      report,
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
    const result = await query(
      `delete from reports where id = $1 returning id, title, year, category`,
      [id]
    );

    if (!result.rowCount) {
      return notFound("Report not found.");
    }

    await createAdminNotification({
      type: "report",
      title: "Report deleted",
      message: `${result.rows[0].title} was deleted.`,
      href: "/admin/ReportPage",
      metadata: {
        reportId: result.rows[0].id,
        year: result.rows[0].year,
        category: result.rows[0].category,
      },
    });

    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}

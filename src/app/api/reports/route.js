import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  created,
  handleRouteError,
  json,
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

const reportSchema = z.object({
  title: z.string().trim().min(2),
  year: z.string().trim().min(4),
  category: z.string().trim().min(2),
  description: z.string().trim().optional().default(""),
  link: z.string().trim().optional().default(""),
});

export async function GET() {
  try {
    const result = await query(
      `select * from reports order by year desc, created_at desc`
    );

    return json({
      reports: result.rows.map(serializeReport),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request) {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  const { data: body, response } = await readJson(request);

  if (response) {
    return response;
  }

  const validation = validate(reportSchema, body);

  if (validation.response) {
    return validation.response;
  }

  const report = validation.data;

  try {
    const result = await query(
      `insert into reports (
        id,
        title,
        year,
        category,
        description,
        link
      )
      values ($1,$2,$3,$4,$5,$6)
      returning *`,
      [
        crypto.randomUUID(),
        report.title,
        report.year,
        report.category,
        report.description,
        report.link,
      ]
    );

    const createdReport = serializeReport(result.rows[0]);

    await createAdminNotification({
      type: "report",
      title: "Report added",
      message: `${createdReport.title} was added to reports.`,
      href: getContentHref("report", createdReport.id),
      metadata: {
        reportId: createdReport.id,
        year: createdReport.year,
        category: createdReport.category,
      },
    });

    return created({
      report: createdReport,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

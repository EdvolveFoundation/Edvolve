import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  created,
  handleRouteError,
  json,
  readJson,
  toDateString,
  validate,
} from "@/lib/api-utils";
import { query } from "@/lib/db";
import { serializeEvent } from "@/lib/serializers";

export const runtime = "nodejs";

const eventSchema = z.object({
  title: z.string().trim().min(2),
  category: z.string().trim().min(2),
  date: z.string().trim().optional().default(""),
  location: z.string().trim().optional().default(""),
  image: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
});

export async function GET() {
  try {
    const result = await query(
      `select * from events order by event_date desc nulls last, created_at desc`
    );

    return json({
      events: result.rows.map(serializeEvent),
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

  const validation = validate(eventSchema, body);

  if (validation.response) {
    return validation.response;
  }

  const event = validation.data;

  try {
    const result = await query(
      `insert into events (
        id,
        title,
        category,
        event_date,
        location,
        image,
        description
      )
      values ($1,$2,$3,$4,$5,$6,$7)
      returning *`,
      [
        crypto.randomUUID(),
        event.title,
        event.category,
        toDateString(event.date),
        event.location,
        event.image,
        event.description,
      ]
    );

    return created({
      event: serializeEvent(result.rows[0]),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

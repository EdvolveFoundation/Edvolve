import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  badRequest,
  handleRouteError,
  json,
  noContent,
  notFound,
  readJson,
  toDateString,
  validate,
} from "@/lib/api-utils";
import { query } from "@/lib/db";
import { serializeEvent } from "@/lib/serializers";

export const runtime = "nodejs";

const updateEventSchema = z.object({
  title: z.string().trim().min(2).optional(),
  category: z.string().trim().min(2).optional(),
  date: z.string().trim().optional(),
  location: z.string().trim().optional(),
  image: z.string().trim().optional(),
  description: z.string().trim().optional(),
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

  const validation = validate(updateEventSchema, body);

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
  if (data.category !== undefined) add("category", data.category);
  if (data.date !== undefined) add("event_date", toDateString(data.date));
  if (data.location !== undefined) add("location", data.location);
  if (data.image !== undefined) add("image", data.image);
  if (data.description !== undefined) add("description", data.description);

  if (!updates.length) {
    return badRequest("No supported fields were provided.");
  }

  values.push(id);

  try {
    const result = await query(
      `update events
       set ${updates.join(", ")}
       where id = $${values.length}
       returning *`,
      values
    );

    if (!result.rowCount) {
      return notFound("Event not found.");
    }

    return json({
      event: serializeEvent(result.rows[0]),
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
    await query(`delete from events where id = $1`, [id]);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}

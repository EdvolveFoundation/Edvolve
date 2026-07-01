import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  handleRouteError,
  json,
  noContent,
  notFound,
  readJson,
  validate,
} from "@/lib/api-utils";
import { query } from "@/lib/db";
import { serializeContactMessage } from "@/lib/serializers";

export const runtime = "nodejs";

const updateContactSchema = z.object({
  read: z.boolean(),
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

  const validation = validate(updateContactSchema, body);

  if (validation.response) {
    return validation.response;
  }

  try {
    const result = await query(
      `update contact_messages
       set read = $1
       where id = $2
       returning *`,
      [validation.data.read, id]
    );

    if (!result.rowCount) {
      return notFound("Message not found.");
    }

    return json({
      contact: serializeContactMessage(result.rows[0]),
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
    await query(`delete from contact_messages where id = $1`, [id]);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}

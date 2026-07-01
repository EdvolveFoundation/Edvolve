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
import { serializeRegistration } from "@/lib/serializers";

export const runtime = "nodejs";

const updateRegistrationSchema = z.object({
  status: z.string().trim().min(2),
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

  const validation = validate(updateRegistrationSchema, body);

  if (validation.response) {
    return validation.response;
  }

  try {
    const result = await query(
      `update registrations
       set status = $1
       where id = $2
       returning *`,
      [validation.data.status, id]
    );

    if (!result.rowCount) {
      return notFound("Registration not found.");
    }

    return json({
      registration: serializeRegistration(result.rows[0]),
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
    await query(`delete from registrations where id = $1`, [id]);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}

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
import { createAdminNotification } from "@/lib/admin-notifications";
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

    const registration = serializeRegistration(result.rows[0]);

    await createAdminNotification({
      type: "registration",
      title: "Registration status updated",
      message: `${registration.name}'s registration is now ${registration.status}.`,
      href: "/admin/registrations",
      metadata: {
        registrationId: registration.id,
        email: registration.email,
        status: registration.status,
      },
    });

    return json({
      registration,
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
      `delete from registrations where id = $1 returning id, name, email, role, status`,
      [id]
    );

    if (!result.rowCount) {
      return notFound("Registration not found.");
    }

    await createAdminNotification({
      type: "registration",
      title: "Registration deleted",
      message: `${result.rows[0].name}'s registration was deleted.`,
      href: "/admin/registrations",
      metadata: {
        registrationId: result.rows[0].id,
        email: result.rows[0].email,
        role: result.rows[0].role,
        status: result.rows[0].status,
      },
    });

    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}

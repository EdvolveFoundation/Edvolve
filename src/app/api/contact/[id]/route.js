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

    const contact = serializeContactMessage(result.rows[0]);

    if (contact.read) {
      await createAdminNotification({
        type: "contact_message",
        title: "Inquiry marked as read",
        message: `${contact.name}'s message was marked as read.`,
        href: "/admin/messages",
        metadata: {
          contactId: contact.id,
          email: contact.email,
        },
      });
    }

    return json({
      contact,
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
      `delete from contact_messages where id = $1 returning id, name, email, subject`,
      [id]
    );

    if (!result.rowCount) {
      return notFound("Message not found.");
    }

    await createAdminNotification({
      type: "contact_message",
      title: "Inquiry deleted",
      message: `${result.rows[0].name}'s message was deleted.`,
      href: "/admin/messages",
      metadata: {
        contactId: result.rows[0].id,
        email: result.rows[0].email,
        subject: result.rows[0].subject,
      },
    });

    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}

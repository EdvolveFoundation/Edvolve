import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  created,
  handleRouteError,
  json,
  readJson,
  validate,
} from "@/lib/api-utils";
import { createAdminNotification } from "@/lib/admin-notifications";
import { query } from "@/lib/db";
import { serializeContactMessage } from "@/lib/serializers";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  subject: z.string().trim().min(2),
  message: z.string().trim().min(5),
});

export async function GET() {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const result = await query(
      `select * from contact_messages order by created_at desc`
    );

    return json({
      contacts: result.rows.map(serializeContactMessage),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request) {
  const { data: body, response } = await readJson(request);

  if (response) {
    return response;
  }

  const validation = validate(contactSchema, body);

  if (validation.response) {
    return validation.response;
  }

  const message = validation.data;

  try {
    const result = await query(
      `insert into contact_messages (
        id,
        name,
        email,
        subject,
        message
      )
      values ($1,$2,$3,$4,$5)
      returning *`,
      [
        crypto.randomUUID(),
        message.name,
        message.email,
        message.subject,
        message.message,
      ]
    );

    const contact = serializeContactMessage(result.rows[0]);

    await createAdminNotification({
      type: "contact_message",
      title: "New inquiry message",
      message: `${contact.name} sent: ${contact.subject}`,
      href: "/admin/messages",
      metadata: {
        contactId: contact.id,
        email: contact.email,
        subject: contact.subject,
      },
    });

    return created({
      contact,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

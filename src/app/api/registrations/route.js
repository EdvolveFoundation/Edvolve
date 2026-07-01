import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  created,
  handleRouteError,
  json,
  readJson,
  validate,
} from "@/lib/api-utils";
import { query } from "@/lib/db";
import { serializeRegistration } from "@/lib/serializers";

export const runtime = "nodejs";

const registrationSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional().default(""),
  location: z.string().trim().optional().default(""),
  role: z.string().trim().min(2),
  message: z.string().trim().optional().default(""),
});

export async function GET() {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const result = await query(
      `select * from registrations order by created_at desc`
    );

    return json({
      registrations: result.rows.map(serializeRegistration),
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

  const validation = validate(registrationSchema, body);

  if (validation.response) {
    return validation.response;
  }

  const registration = validation.data;

  try {
    const result = await query(
      `insert into registrations (
        id,
        name,
        email,
        phone,
        location,
        role,
        message
      )
      values ($1,$2,$3,$4,$5,$6,$7)
      returning *`,
      [
        crypto.randomUUID(),
        registration.name,
        registration.email,
        registration.phone,
        registration.location,
        registration.role,
        registration.message,
      ]
    );

    return created({
      registration: serializeRegistration(result.rows[0]),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

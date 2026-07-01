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
import { serializeStaff } from "@/lib/serializers";

export const runtime = "nodejs";

const staffSchema = z.object({
  fullName: z.string().trim().min(2),
  role: z.string().trim().min(2),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().optional().default(""),
  department: z.string().trim().optional().default(""),
  address: z.string().trim().optional().default(""),
  bio: z.string().trim().optional().default(""),
  image: z.string().trim().optional().default(""),
  category: z.string().trim().optional().default("management"),
  featured: z.boolean().optional().default(false),
});

export async function GET() {
  try {
    const result = await query(
      `select * from staff_members order by featured desc, created_at desc`
    );

    return json({
      staff: result.rows.map(serializeStaff),
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

  const validation = validate(staffSchema, body);

  if (validation.response) {
    return validation.response;
  }

  const staff = validation.data;

  try {
    const result = await query(
      `insert into staff_members (
        id,
        full_name,
        role,
        email,
        phone,
        department,
        address,
        bio,
        image,
        category,
        featured
      )
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      returning *`,
      [
        crypto.randomUUID(),
        staff.fullName,
        staff.role,
        staff.email || null,
        staff.phone,
        staff.department,
        staff.address,
        staff.bio,
        staff.image,
        staff.category,
        staff.featured,
      ]
    );

    return created({
      staff: serializeStaff(result.rows[0]),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

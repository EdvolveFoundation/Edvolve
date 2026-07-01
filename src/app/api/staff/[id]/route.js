import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  badRequest,
  handleRouteError,
  json,
  noContent,
  notFound,
  readJson,
  validate,
} from "@/lib/api-utils";
import { query } from "@/lib/db";
import { serializeStaff } from "@/lib/serializers";

export const runtime = "nodejs";

const updateStaffSchema = z.object({
  fullName: z.string().trim().min(2).optional(),
  role: z.string().trim().min(2).optional(),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().optional(),
  department: z.string().trim().optional(),
  address: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  image: z.string().trim().optional(),
  category: z.string().trim().optional(),
  featured: z.boolean().optional(),
});

export async function GET(request, { params }) {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await params;

  try {
    const result = await query(
      `select * from staff_members where id = $1`,
      [id]
    );

    if (!result.rowCount) {
      return notFound("Staff member not found.");
    }

    return json({
      staff: serializeStaff(result.rows[0]),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

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

  const validation = validate(updateStaffSchema, body);

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

  if (data.fullName !== undefined) add("full_name", data.fullName);
  if (data.role !== undefined) add("role", data.role);
  if (data.email !== undefined) add("email", data.email || null);
  if (data.phone !== undefined) add("phone", data.phone);
  if (data.department !== undefined) add("department", data.department);
  if (data.address !== undefined) add("address", data.address);
  if (data.bio !== undefined) add("bio", data.bio);
  if (data.image !== undefined) add("image", data.image);
  if (data.category !== undefined) add("category", data.category);
  if (data.featured !== undefined) add("featured", data.featured);

  if (!updates.length) {
    return badRequest("No supported fields were provided.");
  }

  values.push(id);

  try {
    const result = await query(
      `update staff_members
       set ${updates.join(", ")}
       where id = $${values.length}
       returning *`,
      values
    );

    if (!result.rowCount) {
      return notFound("Staff member not found.");
    }

    return json({
      staff: serializeStaff(result.rows[0]),
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
    await query(`delete from staff_members where id = $1`, [id]);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}

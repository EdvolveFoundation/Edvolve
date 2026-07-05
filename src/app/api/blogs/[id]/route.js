import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  badRequest,
  handleRouteError,
  json,
  noContent,
  normalizeCommaSeparatedList,
  normalizeParagraphList,
  notFound,
  readJson,
  slugify,
  validate,
} from "@/lib/api-utils";
import {
  createAdminNotification,
  getContentHref,
} from "@/lib/admin-notifications";
import { query } from "@/lib/db";
import { serializeBlog } from "@/lib/serializers";

export const runtime = "nodejs";

const sectionSchema = z.object({
  heading: z.string().trim().optional().default(""),
  image: z.string().trim().optional().default(""),
  content: z
    .union([z.array(z.string()), z.string()])
    .optional()
    .default([]),
});

const updateBlogSchema = z.object({
  title: z.string().trim().min(2).optional(),
  slug: z.string().trim().optional(),
  image: z.string().trim().optional(),
  date: z.string().trim().optional(),
  category: z.string().trim().min(2).optional(),
  author: z.string().trim().optional(),
  readTime: z.string().trim().optional(),
  tags: z.union([z.array(z.string()), z.string()]).optional(),
  quote: z.string().trim().optional(),
  introduction: z.union([z.array(z.string()), z.string()]).optional(),
  sections: z.array(sectionSchema).optional(),
  published: z.boolean().optional(),
});

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const result = await query(
      `select * from blogs where id = $1 or slug = $1 limit 1`,
      [id]
    );

    if (!result.rowCount) {
      return notFound("Blog not found.");
    }

    const blog = serializeBlog(result.rows[0]);

    await createAdminNotification({
      type: "blog",
      title: "Blog post updated",
      message: `${blog.title} was updated.`,
      href: getContentHref("blog", blog.id),
      metadata: {
        blogId: blog.id,
        slug: blog.slug,
      },
    });

    return json({
      blog,
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

  const validation = validate(updateBlogSchema, body);

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
  if (data.slug !== undefined || data.title !== undefined) {
    add("slug", slugify(data.slug || data.title));
  }
  if (data.image !== undefined) add("image", data.image);
  if (data.date !== undefined) add("display_date", data.date);
  if (data.category !== undefined) add("category", data.category);
  if (data.author !== undefined) add("author", data.author);
  if (data.readTime !== undefined) add("read_time", data.readTime);
  if (data.tags !== undefined) {
    add("tags", JSON.stringify(normalizeCommaSeparatedList(data.tags)));
  }
  if (data.quote !== undefined) add("quote", data.quote);
  if (data.introduction !== undefined) {
    add(
      "introduction",
      JSON.stringify(normalizeParagraphList(data.introduction))
    );
  }
  if (data.sections !== undefined) {
    add(
      "sections",
      JSON.stringify(
        data.sections.map((section) => ({
          ...section,
          content: normalizeParagraphList(section.content),
        }))
      )
    );
  }
  if (data.published !== undefined) add("published", data.published);

  if (!updates.length) {
    return badRequest("No supported fields were provided.");
  }

  values.push(id);

  try {
    const result = await query(
      `update blogs
       set ${updates.join(", ")}
       where id = $${values.length}
       returning *`,
      values
    );

    if (!result.rowCount) {
      return notFound("Blog not found.");
    }

    return json({
      blog: serializeBlog(result.rows[0]),
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
      `delete from blogs where id = $1 returning id, title, slug`,
      [id]
    );

    if (!result.rowCount) {
      return notFound("Blog not found.");
    }

    await createAdminNotification({
      type: "blog",
      title: "Blog post deleted",
      message: `${result.rows[0].title} was deleted.`,
      href: "/admin/blog",
      metadata: {
        blogId: result.rows[0].id,
        slug: result.rows[0].slug,
      },
    });

    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}

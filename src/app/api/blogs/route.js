import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-session";
import {
  created,
  handleRouteError,
  json,
  normalizeCommaSeparatedList,
  normalizeParagraphList,
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

const blogSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().optional(),
  image: z.string().trim().optional().default(""),
  date: z.string().trim().optional(),
  category: z.string().trim().min(2),
  author: z.string().trim().optional().default("Edvolve Foundation"),
  readTime: z.string().trim().optional().default(""),
  tags: z.union([z.array(z.string()), z.string()]).optional().default([]),
  quote: z.string().trim().optional().default(""),
  introduction: z
    .union([z.array(z.string()), z.string()])
    .optional()
    .default([]),
  sections: z.array(sectionSchema).optional().default([]),
  published: z.boolean().optional().default(true),
});

function normalizeBlog(input) {
  return {
    ...input,
    slug: slugify(input.slug || input.title),
    tags: normalizeCommaSeparatedList(input.tags),
    introduction: normalizeParagraphList(input.introduction),
    sections: input.sections.map((section) => ({
      ...section,
      content: normalizeParagraphList(section.content),
    })),
  };
}

export async function GET() {
  try {
    const result = await query(
      `select * from blogs
       where published = true
       order by created_at desc`
    );

    return json({
      blogs: result.rows.map(serializeBlog),
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

  const validation = validate(blogSchema, body);

  if (validation.response) {
    return validation.response;
  }

  const blog = normalizeBlog(validation.data);

  try {
    const result = await query(
      `insert into blogs (
        id,
        slug,
        title,
        image,
        display_date,
        category,
        author,
        read_time,
        tags,
        quote,
        introduction,
        sections,
        published
      )
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      returning *`,
      [
        crypto.randomUUID(),
        blog.slug,
        blog.title,
        blog.image,
        blog.date || new Date().toLocaleDateString(),
        blog.category,
        blog.author,
        blog.readTime,
        JSON.stringify(blog.tags),
        blog.quote,
        JSON.stringify(blog.introduction),
        JSON.stringify(blog.sections),
        blog.published,
      ]
    );

    const createdBlog = serializeBlog(result.rows[0]);

    await createAdminNotification({
      type: "blog",
      title: createdBlog.published
        ? "Blog post published"
        : "Blog draft created",
      message: `${createdBlog.title} was added to ${createdBlog.category}.`,
      href: getContentHref("blog", createdBlog.id),
      metadata: {
        blogId: createdBlog.id,
        slug: createdBlog.slug,
      },
    });

    return created({
      blog: createdBlog,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

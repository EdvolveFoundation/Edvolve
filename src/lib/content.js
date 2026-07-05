import { query } from "@/lib/db";
import {
  serializeBlog,
  serializeEvent,
  serializeReport,
  serializeStaff,
} from "@/lib/serializers";

export async function getPublishedBlogs() {
  const result = await query(
    `select * from blogs
     where published = true
     order by created_at desc`
  );

  return result.rows.map(serializeBlog);
}

export async function getPublishedBlogBySlug(slug) {
  const result = await query(
    `select * from blogs
     where slug = $1 and published = true
     limit 1`,
    [slug]
  );

  return result.rowCount ? serializeBlog(result.rows[0]) : null;
}

export async function getRecentPublishedBlogs(currentSlug, limit = 4) {
  const result = await query(
    `select * from blogs
     where published = true and slug <> $1
     order by created_at desc
     limit $2`,
    [currentSlug, limit]
  );

  return result.rows.map(serializeBlog);
}

export async function getReports() {
  const result = await query(
    `select * from reports
     order by year desc, created_at desc`
  );

  return result.rows.map(serializeReport);
}

export async function getStaffMembers() {
  const result = await query(
    `select * from staff_members
     order by featured desc, created_at desc`
  );

  return result.rows.map(serializeStaff);
}

export async function getEvents() {
  const result = await query(
    `select * from events
     order by event_date desc nulls last, created_at desc`
  );

  return result.rows.map(serializeEvent);
}

export function getBlogExcerpt(post, maxLength = 170) {
  const firstParagraph = Array.isArray(post.introduction)
    ? post.introduction[0]
    : "";

  if (!firstParagraph) {
    return "";
  }

  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }

  return `${firstParagraph.slice(0, maxLength).trim()}...`;
}

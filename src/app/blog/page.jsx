import BlogGrid from "@/components/BlogGrid";
import BlogHero from "@/components/BlogHero";
import { getPublishedBlogs } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogs();

  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} />
    </>
  );
}

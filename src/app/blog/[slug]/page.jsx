import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Search } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import {
  getPublishedBlogBySlug,
  getRecentPublishedBlogs,
} from "@/lib/content";

export const dynamic = "force-dynamic";

function normalizeParagraphs(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    return notFound();
  }

  const recentPosts = await getRecentPublishedBlogs(slug);
  const heroImage = post.image || "/logo.png";
  const introduction = normalizeParagraphs(post.introduction);
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const sections = Array.isArray(post.sections) ? post.sections : [];

  return (
    <main className="bg-[#f8f5f1]">
      <section className="relative h-[95vh] overflow-visible">
        <Image
          src={heroImage}
          alt={post.title}
          fill
          priority
          unoptimized={heroImage.startsWith("http")}
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute bottom-[-80px] left-1/2 w-full max-w-5xl -translate-x-1/2 px-6">
          <div className="bg-[#f8f5f1] p-10">
            <p className="mb-5 text-xs uppercase tracking-[4px] text-[#572649]">
              {post.category}
            </p>

            <h1 className="font-serif text-4xl leading-tight text-[#232323] md:text-7xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-[#777]">
              {post.date && (
                <span className="inline-flex items-center gap-2">
                  <Calendar size={18} />
                  {post.date}
                </span>
              )}

              {post.readTime && (
                <span className="inline-flex items-center gap-2">
                  <Clock size={18} />
                  {post.readTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-40">
        <div className="mx-auto max-w-[1450px] px-6">
          <div className="grid gap-20 lg:grid-cols-[2fr_420px]">
            <article>
              {introduction.length > 0 && (
                <div className="mb-16">
                  {introduction.map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-8 ml-4 text-xl leading-[2.2] text-[#444]"
                    >
                      {index === 0 && (
                        <span className="float-left mr-4 font-serif text-7xl leading-none text-[#572649]">
                          {paragraph.charAt(0)}
                        </span>
                      )}
                      {index === 0 ? paragraph.slice(1) : paragraph}
                    </p>
                  ))}
                </div>
              )}

              {post.image && (
                <div className="relative mb-20 h-[550px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized={post.image.startsWith("http")}
                    className="object-cover"
                  />
                </div>
              )}

              {sections.length > 0 && (
                <div className="space-y-20">
                  {sections.map((section, index) => {
                    const content = normalizeParagraphs(section.content);

                    return (
                      <div key={`${section.heading}-${index}`}>
                        {section.heading && (
                          <h2 className="mb-8 font-serif text-4xl text-[#232323] md:text-5xl">
                            {section.heading}
                          </h2>
                        )}

                        {section.image && (
                          <div className="relative mb-10 h-[420px] overflow-hidden">
                            <Image
                              src={section.image}
                              alt={section.heading || post.title}
                              fill
                              unoptimized={section.image.startsWith("http")}
                              className="object-cover"
                            />
                          </div>
                        )}

                        {content.map((paragraph, paragraphIndex) => (
                          <p
                            key={paragraphIndex}
                            className="mb-8 text-lg leading-[2.1] text-[#444]"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}

              {post.quote && (
                <div className="my-24 border-l-4 border-[#572649] pl-10">
                  <p className="font-serif text-3xl italic leading-relaxed text-[#232323]">
                    {post.quote}
                  </p>
                </div>
              )}

              <div className="my-20 flex flex-wrap justify-between gap-8 border-y py-10">
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#ede7e2] px-4 py-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-5">
                  <FaFacebookF className="cursor-pointer text-lg transition hover:text-[#572649]" />
                  <FaXTwitter className="cursor-pointer text-lg transition hover:text-[#572649]" />
                  <FaInstagram className="cursor-pointer text-lg transition hover:text-[#572649]" />
                </div>
              </div>
            </article>

            <aside className="h-fit space-y-10 lg:sticky lg:top-10">
              <div className="bg-white p-8 shadow-sm">
                <h3 className="mb-6 font-serif text-2xl">
                  Search
                </h3>

                <div className="relative">
                  <input
                    placeholder="Search..."
                    className="w-full border border-gray-200 p-4 pr-12 outline-none"
                  />

                  <Search
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>

              <div className="bg-white p-8">
                <h3 className="mb-8 font-serif text-2xl">
                  Recent Posts
                </h3>

                <div className="space-y-8">
                  {recentPosts.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="group flex gap-5"
                    >
                      <div className="relative h-24 w-24 overflow-hidden">
                        <Image
                          src={item.image || "/logo.png"}
                          alt={item.title}
                          fill
                          unoptimized={Boolean(item.image?.startsWith("http"))}
                          className="object-cover duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div>
                        <p className="mb-2 text-sm text-[#777]">
                          {item.date}
                        </p>

                        <h4 className="leading-snug duration-300 group-hover:text-[#572649]">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  ))}

                  {!recentPosts.length && (
                    <p className="text-gray-500">
                      No other posts yet.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

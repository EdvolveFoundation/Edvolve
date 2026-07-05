"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadField from "@/components/admin/UploadField";

const emptyPost = {
  title: "",
  slug: "",
  date: "",
  category: "",
  author: "Edvolve Foundation",
  image: "",
  readTime: "",
  tags: "",
  quote: "",
  introduction: "",
  published: true,
};

const emptySection = {
  heading: "",
  image: "",
  content: "",
};

function paragraphsToText(value) {
  if (Array.isArray(value)) {
    return value.join("\n");
  }

  return value || "";
}

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(emptyPost);
  const [sections, setSections] = useState([emptySection]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadBlog() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/blogs/${id}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Unable to load blog.");
        }

        const data = await response.json();
        const blog = data.blog || {};

        if (!isMounted) {
          return;
        }

        setPost({
          title: blog.title || "",
          slug: blog.slug || "",
          date: blog.date || "",
          category: blog.category || "",
          author: blog.author || "Edvolve Foundation",
          image: blog.image || "",
          readTime: blog.readTime || "",
          tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
          quote: blog.quote || "",
          introduction: paragraphsToText(blog.introduction),
          published: Boolean(blog.published),
        });

        const nextSections = Array.isArray(blog.sections)
          ? blog.sections.map((section) => ({
              heading: section.heading || "",
              image: section.image || "",
              content: paragraphsToText(section.content),
            }))
          : [];

        setSections(nextSections.length ? nextSections : [emptySection]);
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      loadBlog();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handlePostChange = (field, value) => {
    setPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSection = (index, field, value) => {
    setSections((prev) =>
      prev.map((section, sectionIndex) =>
        sectionIndex === index
          ? {
              ...section,
              [field]: value,
            }
          : section
      )
    );
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        ...emptySection,
      },
    ]);
  };

  const removeSection = (index) => {
    setSections((prev) =>
      prev.filter((_, sectionIndex) => sectionIndex !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          slug: post.slug,
          date: post.date,
          category: post.category,
          author: post.author,
          image: post.image,
          readTime: post.readTime,
          tags: post.tags,
          quote: post.quote,
          introduction: post.introduction,
          published: post.published,
          sections,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to update blog.");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="rounded-2xl border bg-white p-8 shadow">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Edit Blog Post
            </h1>

            <p className="mt-2 text-gray-500">
              Update the full article, media, sections, and publishing state.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="rounded-lg border px-5 py-3"
          >
            Back to Blogs
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-lg bg-gray-50 p-4 text-gray-500">
            Loading blog...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Blog Title
                </label>

                <input
                  type="text"
                  value={post.title}
                  onChange={(event) =>
                    handlePostChange("title", event.target.value)
                  }
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Slug
                </label>

                <input
                  type="text"
                  value={post.slug}
                  onChange={(event) =>
                    handlePostChange("slug", event.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Display Date
                </label>

                <input
                  type="text"
                  value={post.date}
                  onChange={(event) =>
                    handlePostChange("date", event.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Category
                </label>

                <input
                  type="text"
                  value={post.category}
                  onChange={(event) =>
                    handlePostChange("category", event.target.value)
                  }
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Author
                </label>

                <input
                  type="text"
                  value={post.author}
                  onChange={(event) =>
                    handlePostChange("author", event.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Read Time
                </label>

                <input
                  type="text"
                  value={post.readTime}
                  onChange={(event) =>
                    handlePostChange("readTime", event.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Tags
                </label>

                <input
                  type="text"
                  value={post.tags}
                  onChange={(event) =>
                    handlePostChange("tags", event.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div className="md:col-span-2">
                <UploadField
                  label="Featured Image"
                  value={post.image}
                  onChange={(value) =>
                    handlePostChange("image", value)
                  }
                  folder="edvolve/blogs"
                  placeholder="/blog-image.jpg or upload an image"
                />
              </div>

              {post.image && (
                <div className="relative h-52 md:col-span-2">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized={post.image.startsWith("http")}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Featured Quote
                </label>

                <textarea
                  rows={4}
                  value={post.quote}
                  onChange={(event) =>
                    handlePostChange("quote", event.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Introduction
                </label>

                <textarea
                  rows={6}
                  value={post.introduction}
                  onChange={(event) =>
                    handlePostChange("introduction", event.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <label className="md:col-span-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={post.published}
                  onChange={(event) =>
                    handlePostChange("published", event.target.checked)
                  }
                  className="h-5 w-5"
                />

                <span>Published</span>
              </label>
            </div>

            <h2 className="mb-6 mt-10 text-2xl font-bold">
              Blog Sections
            </h2>

            {sections.map((section, index) => (
              <div
                key={index}
                className="mb-6 rounded-xl border p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="font-semibold">
                    Section {index + 1}
                  </h3>

                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Section Heading"
                  value={section.heading}
                  onChange={(event) =>
                    updateSection(index, "heading", event.target.value)
                  }
                  className="mb-4 w-full rounded-lg border p-3"
                />

                <div className="mb-4">
                  <UploadField
                    value={section.image}
                    onChange={(value) =>
                      updateSection(index, "image", value)
                    }
                    folder="edvolve/blog-sections"
                    placeholder="/section-image.jpg or upload an image"
                  />
                </div>

                <textarea
                  rows={6}
                  placeholder="One paragraph per line"
                  value={section.content}
                  onChange={(event) =>
                    updateSection(index, "content", event.target.value)
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={addSection}
                className="rounded-lg bg-gray-200 px-5 py-3"
              >
                Add Section
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-[#cebf3e] px-8 py-4 text-white disabled:opacity-70"
              >
                {isSubmitting ? "Updating..." : "Update Blog"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

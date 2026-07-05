"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadField from "@/components/admin/UploadField";

export default function CreateBlogPage() {
  const router = useRouter();

  const [post, setPost] = useState({
    title: "",
    image: "",
    category: "",
    author: "Edvolve Foundation",
    readTime: "",
    quote: "",
    tags: "",
    introduction: "",
  });

  const [sections, setSections] = useState([
    {
      heading: "",
      image: "",
      content: "",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
        heading: "",
        image: "",
        content: "",
      },
    ]);
  };

  const removeSection = (index) => {
    setSections((prev) =>
      prev.filter((_, sectionIndex) => sectionIndex !== index)
    );
  };

  const handleSubmit = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          image: post.image,
          category: post.category,
          author: post.author,
          readTime: post.readTime,
          tags: post.tags,
          quote: post.quote,
          introduction: post.introduction,
          sections,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to create blog.");
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
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow border p-8">
        <h1 className="text-3xl font-bold mb-8">
          Create Blog Post
        </h1>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Blog Title
          </label>

          <input
            type="text"
            value={post.title}
            onChange={(e) =>
              handlePostChange("title", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-5">
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

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Category
          </label>

          <input
            type="text"
            value={post.category}
            onChange={(e) =>
              handlePostChange("category", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Author
          </label>

          <input
            type="text"
            value={post.author}
            onChange={(e) =>
              handlePostChange("author", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Read Time
          </label>

          <input
            type="text"
            placeholder="5 min read"
            value={post.readTime}
            onChange={(e) =>
              handlePostChange("readTime", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Tags
          </label>

          <input
            type="text"
            placeholder="Education, Youth, Innovation"
            value={post.tags}
            onChange={(e) =>
              handlePostChange("tags", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Featured Quote
          </label>

          <textarea
            rows={4}
            value={post.quote}
            onChange={(e) =>
              handlePostChange("quote", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 font-medium">
            Introduction
          </label>

          <textarea
            rows={6}
            placeholder="One paragraph per line"
            value={post.introduction}
            onChange={(e) =>
              handlePostChange("introduction", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6">
          Blog Sections
        </h2>

        {sections.map((section, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 mb-6"
          >
            <h3 className="font-semibold mb-4">
              Section {index + 1}
            </h3>

            <input
              type="text"
              placeholder="Section Heading"
              value={section.heading}
              onChange={(e) =>
                updateSection(
                  index,
                  "heading",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            <div className="mb-4">
              <UploadField
                value={section.image}
                onChange={(value) =>
                  updateSection(
                    index,
                    "image",
                    value
                  )
                }
                folder="edvolve/blog-sections"
                placeholder="/section-image.jpg or upload an image"
              />
            </div>

            <textarea
              rows={6}
              placeholder="One paragraph per line"
              value={section.content}
              onChange={(e) =>
                updateSection(
                  index,
                  "content",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            {sections.length > 1 && (
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove Section
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="bg-gray-200 px-5 py-3 rounded-lg mb-8"
        >
          Add Section
        </button>

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#cebf3e] text-white px-8 py-4 rounded-lg disabled:opacity-70"
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </div>
    </div>
  );
}

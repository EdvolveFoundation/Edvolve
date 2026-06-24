"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handlePostChange = (field, value) => {
    setPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        heading: "",
        image: "",
        content: "",
      },
    ]);
  };

  const removeSection = (index) => {
    setSections(
      sections.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    const blogData = {
      _id: Date.now().toString(),

      slug: generateSlug(post.title),

      title: post.title,
      image: post.image,

      date: new Date().toLocaleDateString(),

      category: post.category,

      author: post.author,

      readTime: post.readTime,

      tags: post.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      quote: post.quote,

      introduction: post.introduction
        .split("\n")
        .filter(Boolean),

      sections: sections.map((section) => ({
        heading: section.heading,

        image: section.image,

        content: section.content
          .split("\n")
          .filter(Boolean),
      })),
    };

    const existingBlogs = JSON.parse(
      localStorage.getItem("blogs") || "[]"
    );

    const updatedBlogs = [
      ...existingBlogs,
      blogData,
    ];

    localStorage.setItem(
      "blogs",
      JSON.stringify(updatedBlogs)
    );

    alert("Blog Created Successfully");

    router.push("/admin/blog");
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow border p-8">
        <h1 className="text-3xl font-bold mb-8">
          Create Blog Post
        </h1>

        {/* TITLE */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Blog Title
          </label>

          <input
            type="text"
            value={post.title}
            onChange={(e) =>
              handlePostChange(
                "title",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* FEATURED IMAGE */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Featured Image
          </label>

          <input
            type="text"
            placeholder="/blog-image.jpg"
            value={post.image}
            onChange={(e) =>
              handlePostChange(
                "image",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Category
          </label>

          <input
            type="text"
            value={post.category}
            onChange={(e) =>
              handlePostChange(
                "category",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* AUTHOR */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Author
          </label>

          <input
            type="text"
            value={post.author}
            onChange={(e) =>
              handlePostChange(
                "author",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* READ TIME */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Read Time
          </label>

          <input
            type="text"
            placeholder="5 min read"
            value={post.readTime}
            onChange={(e) =>
              handlePostChange(
                "readTime",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* TAGS */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Tags
          </label>

          <input
            type="text"
            placeholder="Education, Youth, Innovation"
            value={post.tags}
            onChange={(e) =>
              handlePostChange(
                "tags",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* QUOTE */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Featured Quote
          </label>

          <textarea
            rows={4}
            value={post.quote}
            onChange={(e) =>
              handlePostChange(
                "quote",
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* INTRODUCTION */}
        <div className="mb-8">
          <label className="block mb-2 font-medium">
            Introduction
          </label>

          <textarea
            rows={6}
            placeholder="One paragraph per line"
            value={post.introduction}
            onChange={(e) =>
              handlePostChange(
                "introduction",
                e.target.value
              )
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

            <input
              type="text"
              placeholder="/section-image.jpg"
              value={section.image}
              onChange={(e) =>
                updateSection(
                  index,
                  "image",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

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
                onClick={() =>
                  removeSection(index)
                }
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
            onClick={handleSubmit}
            className="bg-[#cebf3e] text-white px-8 py-4 rounded-lg"
          >
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
}
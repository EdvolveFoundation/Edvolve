"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UploadField from "@/components/admin/UploadField";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    image: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadBlog() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/blogs/${id}`);

        if (!response.ok) {
          throw new Error("Unable to load blog.");
        }

        const data = await response.json();
        const blog = data.blog;

        if (!isMounted) {
          return;
        }

        setFormData({
          title: blog.title || "",
          category: blog.category || "",
          author: blog.author || "",
          image: blog.image || "",
          content: (blog.introduction || []).join("\n"),
        });
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          author: formData.author,
          image: formData.image,
          introduction: formData.content,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update blog.");
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Edit Blog Post
      </h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mb-6 rounded-lg bg-white p-4 text-gray-500">
          Loading blog...
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <UploadField
            label="Featured Image"
            value={formData.image}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                image: value,
              }))
            }
            folder="edvolve/blogs"
          />
        </div>

        {formData.image && (
          <img
            src={formData.image}
            alt={formData.title}
            className="w-48 h-32 object-cover rounded-lg"
          />
        )}

        <div>
          <label className="block mb-2 font-medium">
            Content
          </label>
          <textarea
            name="content"
            rows={10}
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="bg-[#cebf3e] text-white px-6 py-3 rounded-lg"
        >
          {isSubmitting ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditBlogPage() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    // Replace with API call later

    setFormData(blog);
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Blog:", formData);

    // PUT request goes here later
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Edit Blog Post
      </h1>

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
          <label className="block mb-2 font-medium">
            Featured Image
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
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
          className="bg-[#cebf3e] text-white px-6 py-3 rounded-lg"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
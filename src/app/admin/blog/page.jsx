"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BlogTable from "@/components/admin/BlogTable";

export default function BlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      try {
        const response = await fetch("/api/blogs", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load blogs.");
        }

        const data = await response.json();

        if (isMounted) {
          setBlogs(data.blogs || []);
        }
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

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteBlog = async (id) => {
    const confirmed = window.confirm(
      "Delete this blog post?"
    );

    if (!confirmed) return;

    const previousBlogs = blogs;
    setBlogs((prev) =>
      prev.filter((blog) => blog._id !== id)
    );

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete blog.");
      }
    } catch (deleteError) {
      setBlogs(previousBlogs);
      setError(deleteError.message);
    }
  };

  const editBlog = (blog) => {
    router.push(`/admin/blog/edit/${blog._id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Blogs
          </h1>

          {isLoading && (
            <p className="text-gray-500 mt-2">
              Loading blog posts...
            </p>
          )}
        </div>

        <Link href="/admin/blog/add">
          <button
            className="
              bg-[#aa9e31]
              text-white
              px-5
              py-3
              rounded-lg
            "
          >
            Add New Blog
          </button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <BlogTable
        blogs={blogs}
        onDelete={deleteBlog}
        onEdit={editBlog}
      />
    </div>
  );
}

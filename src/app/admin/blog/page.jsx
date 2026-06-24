"use client";

import { useState } from "react";
import BlogTable from "@/components/admin/BlogTable";
import Link from "next/link";

 import { useRouter } from "next/navigation";


export default function BlogPage() {
  const [blogs, setBlogs] = useState([
   
  ]);

  const deleteBlog = (id) => {
    setBlogs((prev) =>
      prev.filter((blog) => blog._id !== id)
    );
  };


const router = useRouter();

const editBlog = (blog) => {
  router.push(`/admin/blog/edit/${blog._id}`);
};

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Blogs
        </h1>

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

      <BlogTable
        blogs={blogs}
        onDelete={deleteBlog}
        onEdit={editBlog}
      />
    </div>
  );
}
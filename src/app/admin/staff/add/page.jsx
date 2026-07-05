"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  Save,
  FileText,
  Users,
} from "lucide-react";
import UploadField from "@/components/admin/UploadField";

const emptyForm = {
  fullName: "",
  role: "",
  email: "",
  phone: "",
  department: "",
  address: "",
  bio: "",
  image: "",
  category: "management",
  featured: false,
};

export default function ManagementAdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save member.");
      }

      setFormData(emptyForm);
      router.push("/admin/staff");
      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Management Administration
          </h1>

          <p className="text-gray-500 mt-2">
            Manage Board of Trustees and Management Team members.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">

          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">
              Member Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add a board member or management team member.
            </p>
          </div>

          {error && (
            <div className="mx-6 mt-6 rounded-lg bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="p-6 grid md:grid-cols-2 gap-6"
          >

            {/* FULL NAME */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full pl-11 pr-4 py-3 border rounded-xl"
                />
              </div>
            </div>

            {/* ROLE */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Position / Role
              </label>

              <div className="relative">
                <Briefcase
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Chairman, Director of Operations..."
                  required
                  className="w-full pl-11 pr-4 py-3 border rounded-xl"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@edvolvefoundation.org"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234..."
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            {/* DEPARTMENT */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Programs"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Office address"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Category
              </label>

              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border rounded-xl bg-white"
                >
                  <option value="board">
                    Board of Trustees
                  </option>

                  <option value="management">
                    Management Team
                  </option>
                </select>
              </div>
            </div>

            <div>
              <UploadField
                label="Image"
                value={formData.image}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    image: value,
                  }))
                }
                folder="edvolve/staff"
                placeholder="/images/member.jpg or upload an image"
                inputClassName="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            {/* BIO */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">
                Biography
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-5 text-gray-400"
                />

                <textarea
                  rows={6}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write member biography..."
                  className="w-full pl-11 pr-4 py-3 border rounded-xl resize-none"
                />
              </div>
            </div>

            {/* FEATURED MEMBER */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5"
                />

                <span>
                  Featured Member (Chairman / Highlighted Member)
                </span>
              </label>
            </div>

            {/* BUTTONS */}
            <div className="md:col-span-2 flex justify-end gap-4">

              <button
                type="button"
                onClick={() => router.push("/admin/staff")}
                className="px-6 py-3 border rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl"
              >
                <Save size={18} />
                {isSubmitting ? "Saving..." : "Save Member"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

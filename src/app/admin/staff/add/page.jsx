"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  MapPin,
  Save,
} from "lucide-react";

export default function StaffPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);

      alert("Staff saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Staff Registration
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage staff member profiles.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">

          {/* Card Header */}
          <div className="border-b p-6">

            <h2 className="text-xl font-semibold text-gray-900">
              Staff Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Fill in staff details below.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
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
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Role
              </label>

              <div className="relative">

                <Briefcase
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="role"
                  placeholder="Manager"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Department
              </label>

              <div className="relative">

                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
                >
                  <option value="">
                    Select Department
                  </option>

                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT">IT</option>
                </select>

              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">

              <label className="block text-sm font-medium mb-2 text-gray-700">
                Address
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-4 top-5 text-gray-400"
                />

                <textarea
                  name="address"
                  rows="4"
                  placeholder="Enter full address..."
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black resize-none"
                />

              </div>

            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-end gap-4 mt-2">

              <button
                type="button"
                className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                <Save size={18} />
                Save Staff
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
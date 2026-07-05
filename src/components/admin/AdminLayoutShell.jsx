"use client";

import { usePathname } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayoutShell({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return children;
  }

  return (
    <AdminProtectedRoute>
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 bg-gray-100 min-h-screen">
          <AdminNavbar />

          <main className="p-8">{children}</main>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}

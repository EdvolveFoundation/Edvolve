"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { usePathname } from "next/navigation";




export default function AdminLayout({
  children,
}) {

   const pathname = usePathname();


  const isLoginPage =
    pathname ===
    "/admin/login";

  // LOGIN PAGE ONLY

  if(isLoginPage){

    return children;

  }

  return (
    <AdminProtectedRoute>
      <div className="flex">

        <AdminSidebar />

        <div className="
        flex-1
        bg-gray-100
        min-h-screen
      ">

          <AdminNavbar />

          <main className="p-8">

            {children}

          </main>

        </div>

      </div>
    </AdminProtectedRoute>

  );
}
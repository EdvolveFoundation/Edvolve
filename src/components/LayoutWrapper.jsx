"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <SessionProvider>
      {!isAdmin && <Navbar />}

      {children}

      {!isAdmin && <Footer />}
    </SessionProvider>
  );
}

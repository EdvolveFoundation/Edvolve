import AdminLayoutShell from "@/components/admin/AdminLayoutShell";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },
};

export default function AdminLayout({
  children,
}) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}

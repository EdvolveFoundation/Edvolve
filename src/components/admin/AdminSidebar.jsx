"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  Mail,
  Image,
   CalendarDays,
  ScrollText,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    name: "Blogs",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    name: "Staffs",
    href: "/admin/staff",
    icon: Users,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: Mail,
  },

 {
  name: "Events",
  href: "/admin/events",
  icon: CalendarDays,
},


{
  name: "Reports",
  href: "/admin/ReportPage",
  icon: FileText,
}



];

export default function AdminSidebar() {

  const pathname = usePathname();

  return (
    <aside className="
      w-72
      min-h-screen
      bg-[#161615]
      text-white
      border-r
      border-white/40
      p-6
      flex
      flex-col
      pt-13
    ">

      {/* Logo / Header */}

      <div className="mb-12">

        <div className="flex flex-col items-center gap-2 -mt-9">
          <img

            className="w-56 md:w-43 cursor-pointer"
            src="/logo.png"
            alt="logo"
          />

          <p className="text-xl text-white/60 -mt-3">
            Admin Dashboard
          </p>
        </div>

      </div>

      {/* Navigation */}

      <nav className="space-y-2 flex-1">

        {links.map((link) => {

          const Icon = link.icon;

          const isActive =
            pathname === link.href ||
            pathname.startsWith(
              `${link.href}/`
            );

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-2xl
                transition-all
                duration-300
                group

                ${isActive
                  ? `
                      bg-white
                      text-[#4E1F42]
                      shadow-lg
                    `
                  : `
                      text-white/80
                      hover:bg-white/10
                      hover:text-white
                    `
                }
              `}
            >

              {/* Active Left Indicator */}

              {isActive && (
                <div className="
                  absolute
                  left-0
                  top-2
                  bottom-2
                  w-1
                  rounded-full
                  bg-[#FFD369]
                " />
              )}

              <Icon
                size={20}
                className="
                  shrink-0
                  transition
                "
              />

              <span className="font-medium">
                {link.name}
              </span>

            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="
        mt-10
        pt-6
        border-t
        border-white/10
      ">

        <div className="
          bg-white/5
          rounded-2xl
          p-4
        ">

          <p className="text-sm text-white/60">
            Logged in as
          </p>

          <h4 className="font-semibold mt-1">
            Admin User
          </h4>

        </div>

      </div>

    </aside>
  );
}
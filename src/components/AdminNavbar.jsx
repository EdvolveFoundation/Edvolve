"use client";

import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import {
    Bell,
    ChevronDown,
    Search,
    CheckCircle,
    LogOut,
} from "lucide-react";


export default function AdminNavbar() {

    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const adminName =
        session?.user?.name || "Admin";

    const [notifications, setNotifications] =
        useState([
            {
                id: 1,
                title: "New Blog Published",
                message:
                    "A new blog has been added successfully.",
                read: false,
            },
            {
                id: 2,
                title: "New Event Created",
                message:
                    "Community Outreach event was created.",
                read: false,
            },
            {
                id: 3,
                title: "New Message",
                message:
                    "A visitor submitted a contact form.",
                read: true,
            },
        ]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target
                )
            ) {
                setOpen(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target
                )
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const unreadCount =
        notifications.filter(
            (item) => !item.read
        ).length;

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        read: true,
                    }
                    : item
            )
        );
    };

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/admin/login",
        });
    };

    return (
        <header
            className="
        relative
        bg-white
        border-b
        border-gray-200
        h-[75px]
        px-8
        flex
        items-center
        justify-between
      "
        >
            {/* LEFT */}
            <h2 className="text-lg font-medium text-gray-700">
                Welcome

                <span className="ml-1 font-bold text-black">
                    {adminName}!
                </span>

                👋
            </h2>

            {/* RIGHT */}
            <div className="flex items-center gap-5">
                {/* SEARCH */}
                <div className="relative hidden md:block">
                    <Search
                        size={18}
                        className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="
              w-[260px]
              bg-gray-50
              border
              rounded-full
              pl-11
              pr-4
              py-2.5
              outline-none
              focus:ring-2
              focus:ring-[#572649]
            "
                    />
                </div>

                {/* NOTIFICATIONS */}
                <div
                    ref={notificationRef}
                    className="relative"
                >
                    <button
                        onClick={() => {
                            setOpen((prev) => !prev);
                            setProfileOpen(false);
                        }}
                        className="
    relative
    w-10
    h-10
    rounded-full
    border
    flex
    items-center
    justify-center
    hover:bg-gray-100
  "
                    >
                        <Bell size={18} />

                        {unreadCount > 0 && (
                            <span
                                className="
                  absolute
                  -top-1
                  -right-1
                  bg-red-500
                  text-white
                  text-[10px]
                  px-1.5
                  py-[2px]
                  rounded-full
                "
                            >
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {open && (
                        <div
                            className="
                absolute
                right-0
                mt-4
                w-[360px]
                bg-white
                rounded-2xl
                shadow-2xl
                border
                border-gray-200
                overflow-hidden
                z-50
              "
                        >
                            <div
                                className="
                  p-5
                  border-b
                  border-gray-200
                  flex
                  justify-between
                "
                            >
                                <h3 className="font-bold text-lg">
                                    Notifications
                                </h3>

                                <span className="text-sm text-gray-500">
                                    {unreadCount} unread
                                </span>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.length >
                                    0 ? (
                                    notifications.map(
                                        (item) => (
                                            <div
                                                key={item.id}
                                                className={`
                          p-5
                          border-b
                          border-gray-200
                          ${!item.read
                                                        ? "bg-purple-50"
                                                        : "bg-white"
                                                    }
                        `}
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h4 className="font-semibold">
                                                            {item.title}
                                                        </h4>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {
                                                                item.message
                                                            }
                                                        </p>
                                                    </div>

                                                    {!item.read && (
                                                        <button
                                                            onClick={() =>
                                                                markAsRead(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <CheckCircle
                                                                size={18}
                                                                className="text-green-600"
                                                            />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="p-6 text-center text-gray-500">
                                        No notifications
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* PROFILE */}
                <div
                    ref={profileRef}
                    className="relative"
                ><button
                    onClick={() => {
                        setProfileOpen(
                            (prev) => !prev
                        );
                        setOpen(false);
                    }}
                    className="
    flex
    items-center
    gap-3
    cursor-pointer
  "
                >
                        <img
                            src="/avatar1.png"
                            alt="Admin"
                            className="
                w-10
                h-10
                rounded-full
                border
                border-gray-200
              "
                        />

                        <div className="hidden md:flex items-center gap-2">
                            <span className="font-semibold text-gray-700">
                                {adminName}
                            </span>

                            <ChevronDown
                                size={16}
                                className={`transition ${profileOpen
                                    ? "rotate-180"
                                    : ""
                                    }`}
                            />
                        </div>
                    </button>

                    {profileOpen && (
                        <div
                            className="
                absolute
                right-0
                mt-4
                w-[260px]
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-2xl
                overflow-hidden
                z-50
              "
                        >
                            <div className="p-5 border-b border-gray-200">
                                <h3 className="font-bold">
                                    {adminName}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    edvolvefoundation.org
                                </p>
                            </div>

                           

                            <div className="border-t border-gray-200 p-2">
                                <button
                                    onClick={handleLogout}
                                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-red-600
                    hover:bg-red-50
                  "
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

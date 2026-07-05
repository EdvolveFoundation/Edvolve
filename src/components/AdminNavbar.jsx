"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
    Bell,
    ChevronDown,
    Search,
    CheckCircle,
    LogOut,
    RefreshCw,
} from "lucide-react";

function formatNotificationTime(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
}

export default function AdminNavbar() {

    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notificationsLoading, setNotificationsLoading] = useState(false);
    const [notificationsError, setNotificationsError] = useState("");

    const adminName =
        session?.user?.name || "Admin";

    const loadNotifications = useCallback(async () => {
        if (status !== "authenticated") {
            return;
        }

        setNotificationsLoading(true);
        setNotificationsError("");

        try {
            const response = await fetch("/api/admin/notifications?limit=20", {
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error("Unable to load notifications.");
            }

            const data = await response.json();

            setNotifications(data.notifications || []);
            setUnreadCount(Number(data.unreadCount || 0));
        } catch (error) {
            setNotificationsError(error.message);
        } finally {
            setNotificationsLoading(false);
        }
    }, [status]);

    useEffect(() => {
        if (status !== "authenticated") {
            return undefined;
        }

        const timeoutId = window.setTimeout(loadNotifications, 0);

        return () => window.clearTimeout(timeoutId);
    }, [loadNotifications, status]);

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

    useEffect(() => {
        if (open) {
            const timeoutId = window.setTimeout(loadNotifications, 0);

            return () => window.clearTimeout(timeoutId);
        }

        return undefined;
    }, [loadNotifications, open]);

    const hasNotifications = notifications.length > 0;

    const renderedNotifications = useMemo(
        () =>
            notifications.map((item) => ({
                ...item,
                timeLabel: formatNotificationTime(item.createdAt),
            })),
        [notifications]
    );

    const markAsRead = async (id) => {
        const target = notifications.find((item) => item.id === id);

        if (!target || target.read) {
            return;
        }

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
        setUnreadCount((prev) => Math.max(prev - 1, 0));

        try {
            const response = await fetch(`/api/admin/notifications/${id}`, {
                method: "PATCH",
            });

            if (!response.ok) {
                throw new Error("Unable to update notification.");
            }
        } catch (error) {
            setNotificationsError(error.message);
            loadNotifications();
        }
    };

    const markAllAsRead = async () => {
        if (!unreadCount) {
            return;
        }

        setNotifications((prev) =>
            prev.map((item) => ({
                ...item,
                read: true,
            }))
        );
        setUnreadCount(0);

        try {
            const response = await fetch("/api/admin/notifications", {
                method: "PATCH",
            });

            if (!response.ok) {
                throw new Error("Unable to update notifications.");
            }
        } catch (error) {
            setNotificationsError(error.message);
            loadNotifications();
        }
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

                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
                                <button
                                    type="button"
                                    onClick={loadNotifications}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#572649]"
                                >
                                    <RefreshCw
                                        size={15}
                                        className={
                                            notificationsLoading
                                                ? "animate-spin"
                                                : ""
                                        }
                                    />
                                    Refresh
                                </button>

                                <button
                                    type="button"
                                    onClick={markAllAsRead}
                                    disabled={!unreadCount}
                                    className="text-sm font-semibold text-[#572649] disabled:cursor-not-allowed disabled:text-gray-300"
                                >
                                    Mark all read
                                </button>
                            </div>

                            {notificationsError && (
                                <div className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700">
                                    {notificationsError}
                                </div>
                            )}

                            <div className="max-h-[400px] overflow-y-auto">
                                {notificationsLoading &&
                                !hasNotifications ? (
                                    <div className="p-6 text-center text-gray-500">
                                        Loading notifications...
                                    </div>
                                ) : hasNotifications ? (
                                    renderedNotifications.map(
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
                                                <div className="flex gap-4">
                                                    <a
                                                        href={
                                                            item.href ||
                                                            "/admin"
                                                        }
                                                        onClick={() =>
                                                            markAsRead(
                                                                item.id
                                                            )
                                                        }
                                                        className="min-w-0 flex-1"
                                                    >
                                                        <h4 className="font-semibold text-gray-900">
                                                            {item.title}
                                                        </h4>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {
                                                                item.message
                                                            }
                                                        </p>

                                                        {item.timeLabel && (
                                                            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                                                                {
                                                                    item.timeLabel
                                                                }
                                                            </p>
                                                        )}
                                                    </a>

                                                    {!item.read && (
                                                        <button
                                                            type="button"
                                                            aria-label="Mark notification as read"
                                                            className="mt-1 h-8 w-8 shrink-0 rounded-full text-green-600 hover:bg-green-50 flex items-center justify-center"
                                                            onClick={() =>
                                                                markAsRead(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <CheckCircle
                                                                size={18}
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

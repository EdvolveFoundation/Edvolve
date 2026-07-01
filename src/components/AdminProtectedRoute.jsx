"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AdminProtectedRoute({
  children,
}) {

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/admin/login");
    },
  });

  /* Prevent flash */

  if(status === "loading"){

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-white
      ">

        <div className="
          w-12
          h-12
          border-4
          border-gray-200
          border-t-[#572649]
          rounded-full
          animate-spin
        " />

      </div>

    );

  }

  return children;
}

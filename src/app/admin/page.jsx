"use client";

import { useEffect, useState } from "react";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardCharts from "@/components/admin/DashboardCharts";

export default function DashboardPage() {
  const [dashboardStats, setDashboardStats] = useState({
    blogs: 0,
    staffs: 0,
    messages: 0,
    events: 0,
    registrations: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const response = await fetch("/api/admin/stats", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load dashboard stats.");
        }

        const data = await response.json();

        if (isMounted) {
          setDashboardStats(data.stats || {});
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <DashboardStats stats={dashboardStats} />

      <DashboardCharts stats={dashboardStats} />
    </>
  );
}

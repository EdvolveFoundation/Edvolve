"use client";

import { useEffect, useState } from "react";
import StaffTable from "@/components/admin/StaffTable";

export default function StaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStaff() {
      try {
        const response = await fetch("/api/staff", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load staff.");
        }

        const data = await response.json();

        if (isMounted) {
          setStaffList(data.staff || []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStaff();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this staff member?"
    );

    if (!confirmed) return;

    const previousStaff = staffList;
    setStaffList((prev) =>
      prev.filter((staff) => staff._id !== id)
    );

    try {
      const response = await fetch(`/api/staff/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete staff member.");
      }
    } catch (deleteError) {
      setStaffList(previousStaff);
      setError(deleteError.message);
    }
  };

  return (
    <div className="p-5">
      {isLoading && (
        <p className="mb-4 text-gray-500">
          Loading staff...
        </p>
      )}

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <StaffTable
        staffList={staffList}
        onDelete={handleDelete}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import StaffTable from "@/components/admin/StaffTable";

export default function StaffPage() {
  const [staffList, setStaffList] = useState([]);

  const handleDelete = (id) => {
    setStaffList(staffList.filter((s) => s.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Staff</h1>

      {/* 👇 THIS IS WHERE IT GOES */}
      <StaffTable staffList={staffList} onDelete={handleDelete} />
    </div>
  );
}
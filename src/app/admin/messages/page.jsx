"use client";

import MessagesTable from "@/components/admin/MessagesTable";
import { useState } from "react";


export default function MessagesPage() {
  const [contacts, setContacts] = useState([]);

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this message?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/contact/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      // remove immediately from UI
      setContacts((prev) =>
        prev.filter(
          (message) => message._id !== id
        )
      );

      alert("Message deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete message");
    }
  };

  return (
    <MessagesTable
      contacts={contacts}
      onDelete={deleteMessage}
    />
  );
}
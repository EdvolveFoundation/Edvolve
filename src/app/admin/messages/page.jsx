"use client";

import MessagesTable from "@/components/admin/MessagesTable";
import { useEffect, useState } from "react";


export default function MessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadMessages() {
      try {
        const response = await fetch("/api/contact", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load messages.");
        }

        const data = await response.json();

        if (isMounted) {
          setContacts(data.contacts || []);
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

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, []);

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

      setContacts((prev) =>
        prev.filter(
          (message) => message._id !== id
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {isLoading && (
        <p className="mb-4 text-gray-500">
          Loading messages...
        </p>
      )}

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <MessagesTable
        contacts={contacts}
        onDelete={deleteMessage}
      />
    </>
  );
}

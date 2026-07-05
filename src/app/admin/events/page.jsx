"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import UploadField from "@/components/admin/UploadField";

const emptyForm = {
  title: "",
  category: "",
  date: "",
  location: "",
  image: "",
  description: "",
};

function formatDateInput(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  return new Date(value).toISOString().slice(0, 10);
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const response = await fetch("/api/events", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load events.");
        }

        const data = await response.json();

        if (isMounted) {
          setEvents(data.events || []);
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

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function startEdit(event) {
    setEditingEvent(event);
    setForm({
      title: event.title || "",
      category: event.category || "",
      date: formatDateInput(event.date),
      location: event.location || "",
      image: event.image || "",
      description: event.description || "",
    });
    setError("");
  }

  function resetForm() {
    setEditingEvent(null);
    setForm(emptyForm);
    setError("");
  }

  async function saveEvent(event) {
    event.preventDefault();

    if (!form.title || !form.category) {
      setError("Title and category are required.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        editingEvent ? `/api/events/${editingEvent._id}` : "/api/events",
        {
          method: editingEvent ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to save event.");
      }

      const data = await response.json();

      setEvents((prev) =>
        editingEvent
          ? prev.map((item) =>
              item._id === editingEvent._id ? data.event : item
            )
          : [data.event, ...prev]
      );
      resetForm();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteEvent(id) {
    const confirmed = window.confirm("Delete this event?");

    if (!confirmed) return;

    const previousEvents = events;

    setEvents((prev) =>
      prev.filter((event) => event._id !== id)
    );

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete event.");
      }

      if (editingEvent?._id === id) {
        resetForm();
      }
    } catch (deleteError) {
      setEvents(previousEvents);
      setError(deleteError.message);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4f1] py-20">
      <div className="mx-auto max-w-[1500px] px-6">
        <h1 className="mb-6 font-serif text-5xl">
          Event Management
        </h1>

        {isLoading && (
          <p className="mb-6 text-gray-500">
            Loading events...
          </p>
        )}

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-16 lg:grid-cols-[500px_1fr]">
          <div className="bg-white p-10 shadow-sm">
            <div className="mb-10 flex items-center justify-between gap-4">
              <h2 className="font-serif text-3xl">
                {editingEvent ? "Edit Event" : "Add Event"}
              </h2>

              {editingEvent && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2"
                >
                  <X size={16} />
                  Cancel
                </button>
              )}
            </div>

            <form
              onSubmit={saveEvent}
              className="space-y-6"
            >
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="inputAdmin w-full border border-gray-200 py-4 pl-3"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="inputAdmin w-full border border-gray-200 bg-white px-3 py-4"
              >
                <option value="">
                  Select Category
                </option>
                <option value="Education">
                  Education
                </option>
                <option value="MSME Development">
                  MSME Development
                </option>
                <option value="Agro Development">
                  Agro Development
                </option>
                <option value="Outreach">
                  Outreach
                </option>
                <option value="Partnership">
                  Partnership
                </option>
              </select>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="inputAdmin w-full border border-gray-200 px-3 py-4"
              />

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="inputAdmin w-full border border-gray-200 py-4 pl-3"
              />

              <UploadField
                value={form.image}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    image: value,
                  }))
                }
                folder="edvolve/events"
                placeholder="Image URL or upload an image"
                inputClassName="inputAdmin w-full border border-gray-200 py-4 pl-3"
              />

              {form.image && (
                <div className="relative h-[220px]">
                  <Image
                    src={form.image}
                    alt="preview"
                    fill
                    unoptimized
                    className="rounded-lg object-cover"
                  />
                </div>
              )}

              <textarea
                rows={5}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="inputAdmin w-full resize-none border border-gray-200 py-4 pl-3"
              />

              <button
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-4 bg-[#aa9e31] py-5 text-white transition hover:bg-[#572649]"
              >
                <Plus size={18} />
                {isSubmitting
                  ? "Saving..."
                  : editingEvent
                    ? "Update Event"
                    : "Add Event"}
              </button>
            </form>
          </div>

          <div>
            <h2 className="mb-10 font-serif text-4xl">
              Events
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="overflow-hidden bg-white shadow-sm"
                >
                  {event.image ? (
                    <div className="relative h-[260px]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-[260px] items-center justify-center bg-gray-100 text-gray-500">
                      No image
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className="mb-4 font-serif text-3xl">
                      {event.title}
                    </h3>

                    <p className="mb-2">
                      {event.category}
                    </p>

                    <p className="mb-2">
                      {event.date
                        ? formatDateInput(event.date)
                        : "No date"}
                    </p>

                    <p className="mb-4">
                      {event.location}
                    </p>

                    {event.description && (
                      <p className="mb-6 line-clamp-3 text-gray-600">
                        {event.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => startEdit(event)}
                        className="flex items-center gap-3 bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                      >
                        <Pencil size={18} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteEvent(event._id)}
                        className="flex items-center gap-3 bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {!events.length && !isLoading && (
                <div className="bg-white p-10 text-gray-500">
                  No events found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

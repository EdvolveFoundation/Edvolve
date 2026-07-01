"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus } from "lucide-react";
import UploadField from "@/components/admin/UploadField";

const emptyForm = {
  title: "",
  category: "",
  date: "",
  location: "",
  image: "",
  description: "",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
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

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function addEvent(e) {
    e.preventDefault();

    if (!form.title || !form.category) {
      setError("Title and category are required.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to add event.");
      }

      const data = await response.json();

      setEvents((prev) => [
        data.event,
        ...prev,
      ]);
      setForm(emptyForm);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteEvent(id) {
    const confirmed = window.confirm(
      "Delete this event?"
    );

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
    } catch (deleteError) {
      setEvents(previousEvents);
      setError(deleteError.message);
    }
  }

  return (
    <main className="bg-[#f7f4f1] min-h-screen py-20">
      <div className="max-w-[1500px] mx-auto px-6">
        <h1 className="font-serif text-5xl mb-6">
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

        <div className="grid lg:grid-cols-[500px_1fr] gap-16">
          <div className="bg-white p-10 shadow-sm">
            <h2 className="font-serif text-3xl mb-10">
              Add Event
            </h2>

            <form
              onSubmit={addEvent}
              className="space-y-6"
            >
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="inputAdmin border border-gray-200 py-4 pl-3 w-full"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="inputAdmin border border-gray-200 py-4 px-3 w-full bg-white"
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
                className="inputAdmin border border-gray-200 py-4 px-3 w-full"
              />

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="inputAdmin border border-gray-200 py-4 pl-3 w-full"
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
                inputClassName="inputAdmin border border-gray-200 py-4 pl-3 w-full"
              />

              {form.image && (
                <div className="relative h-[220px]">
                  <Image
                    src={form.image}
                    alt="preview"
                    fill
                    unoptimized
                    className="object-cover rounded-lg"
                  />
                </div>
              )}

              <textarea
                rows={5}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="inputAdmin resize-none border border-gray-200 py-4 pl-3 w-full"
              />

              <button
                disabled={isSubmitting}
                className="bg-[#aa9e31] text-white w-full py-5 flex items-center justify-center gap-4 hover:bg-[#572649] transition"
              >
                <Plus size={18} />
                {isSubmitting ? "Adding..." : "Add Event"}
              </button>
            </form>
          </div>

          <div>
            <h2 className="font-serif text-4xl mb-10">
              Events
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white shadow-sm overflow-hidden"
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
                    <div className="h-[260px] bg-gray-100 flex items-center justify-center text-gray-500">
                      No image
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className="font-serif text-3xl mb-4">
                      {event.title}
                    </h3>

                    <p className="mb-2">
                      {event.category}
                    </p>

                    <p className="mb-2">
                      {event.date || "No date"}
                    </p>

                    <p className="mb-6">
                      {event.location}
                    </p>

                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="bg-red-500 text-white px-6 py-3 flex items-center gap-3 hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
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

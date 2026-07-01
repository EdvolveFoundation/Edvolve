"use client";

import { useEffect, useState } from "react";
import { Trash2, CheckCircle2, Clock, Users } from "lucide-react";

const statusOptions = [
  "new",
  "reviewing",
  "approved",
  "closed",
];

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadRegistrations() {
      try {
        const response = await fetch("/api/registrations", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load registrations.");
        }

        const data = await response.json();

        if (isMounted) {
          setRegistrations(data.registrations || []);
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

    loadRegistrations();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateStatus = async (id, status) => {
    setError("");

    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to update registration.");
      }

      const data = await response.json();

      setRegistrations((prev) =>
        prev.map((registration) =>
          registration._id === id
            ? data.registration
            : registration
        )
      );
    } catch (updateError) {
      setError(updateError.message);
    }
  };

  const deleteRegistration = async (id) => {
    const confirmed = window.confirm(
      "Delete this registration?"
    );

    if (!confirmed) return;

    const previousRegistrations = registrations;

    setRegistrations((prev) =>
      prev.filter((registration) => registration._id !== id)
    );

    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete registration.");
      }
    } catch (deleteError) {
      setRegistrations(previousRegistrations);
      setError(deleteError.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Registrations
        </h1>

        <p className="text-gray-500 mt-2">
          Review mentors, volunteers, partners, and mentees who submitted the public form.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Total
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {registrations.length}
              </h3>
            </div>

            <Users className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                New
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {
                  registrations.filter(
                    (registration) => registration.status === "new"
                  ).length
                }
              </h3>
            </div>

            <Clock className="text-amber-500" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Approved
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {
                  registrations.filter(
                    (registration) => registration.status === "approved"
                  ).length
                }
              </h3>
            </div>

            <CheckCircle2 className="text-green-500" />
          </div>
        </div>
      </div>

      {isLoading && (
        <p className="text-gray-500">
          Loading registrations...
        </p>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="px-6 py-4 font-semibold">
                  Person
                </th>

                <th className="px-6 py-4 font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 font-semibold">
                  Location
                </th>

                <th className="px-6 py-4 font-semibold">
                  Message
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {registrations.map((registration) => (
                <tr
                  key={registration._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {registration.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {registration.email}
                    </p>

                    <p className="text-sm text-gray-500">
                      {registration.phone}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    {registration.role}
                  </td>

                  <td className="px-6 py-5">
                    {registration.location}
                  </td>

                  <td className="px-6 py-5 max-w-md">
                    <p className="line-clamp-2 text-gray-600">
                      {registration.message}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <select
                      value={registration.status}
                      onChange={(e) =>
                        updateStatus(registration._id, e.target.value)
                      }
                      className="border rounded-lg px-3 py-2 bg-white"
                    >
                      {statusOptions.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-6 py-5">
                    <button
                      onClick={() =>
                        deleteRegistration(registration._id)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!registrations.length && !isLoading && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-14 text-center text-gray-500"
                  >
                    No registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

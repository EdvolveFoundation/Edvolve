"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, FileText } from "lucide-react";
import UploadField from "@/components/admin/UploadField";

const emptyForm = {
  title: "",
  year: "",
  category: "",
  description: "",
  link: "",
};

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadReports() {
      try {
        const response = await fetch("/api/reports", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load reports.");
        }

        const data = await response.json();

        if (isMounted) {
          setReports(data.reports || []);
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

    loadReports();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const openAddModal = () => {
    setEditingReport(null);
    setFormData(emptyForm);
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (report) => {
    setEditingReport(report);
    setFormData({
      title: report.title || "",
      year: report.year || "",
      category: report.category || "",
      description: report.description || "",
      link: report.link || "",
    });
    setError("");
    setIsModalOpen(true);
  };

  const saveReport = async () => {
    if (
      !formData.title ||
      !formData.year ||
      !formData.category
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(
        editingReport
          ? `/api/reports/${editingReport._id}`
          : "/api/reports",
        {
          method: editingReport ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to save report.");
      }

      const data = await response.json();

      setReports((prev) =>
        editingReport
          ? prev.map((report) =>
              report._id === editingReport._id
                ? data.report
                : report
            )
          : [data.report, ...prev]
      );

      setIsModalOpen(false);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this report?"
    );

    if (!confirmDelete) return;

    const previousReports = reports;

    setReports((prev) =>
      prev.filter((report) => report._id !== id)
    );

    try {
      const response = await fetch(`/api/reports/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete report.");
      }
    } catch (deleteError) {
      setReports(previousReports);
      setError(deleteError.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Reports & Publications
          </h1>

          <p className="text-gray-500 mt-1">
            Manage organizational reports and publications
          </p>

          {isLoading && (
            <p className="text-gray-500 mt-2">
              Loading reports...
            </p>
          )}
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#aa9e31] text-white px-5 py-3 rounded-lg hover:opacity-90"
        >
          Add Report
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  Title
                </th>
                <th className="p-4 text-left">
                  Year
                </th>
                <th className="p-4 text-left">
                  Category
                </th>
                <th className="p-4 text-left">
                  Description
                </th>
                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr
                    key={report._id}
                    className="border-t"
                  >
                    <td className="p-4 font-medium">
                      {report.title}
                    </td>

                    <td className="p-4">
                      {report.year}
                    </td>

                    <td className="p-4">
                      {report.category}
                    </td>

                    <td className="p-4 max-w-sm truncate">
                      {report.description}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => openEditModal(report)}
                          className="text-blue-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => deleteReport(report._id)}
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-12 text-center"
                  >
                    <FileText
                      size={40}
                      className="mx-auto mb-4 text-gray-400"
                    />

                    <h3 className="font-semibold">
                      No Reports Found
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Click &quot;Add Report&quot; to create your first report.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">
              {editingReport ? "Edit Report" : "Add Report"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Report Title"
                value={formData.title}
                onChange={(e) =>
                  handleChange("title", e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="2025"
                value={formData.year}
                onChange={(e) =>
                  handleChange("year", e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="Corporate Publication"
                value={formData.category}
                onChange={(e) =>
                  handleChange("category", e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

              <textarea
                rows={4}
                placeholder="Report Description"
                value={formData.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

              <UploadField
                value={formData.link}
                onChange={(value) =>
                  handleChange("link", value)
                }
                folder="edvolve/reports"
                accept="application/pdf"
                placeholder="PDF link or upload a PDF"
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border px-5 py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveReport}
                disabled={isSaving}
                className="bg-[#aa9e31] text-white px-5 py-3 rounded-lg"
              >
                {isSaving
                  ? "Saving..."
                  : editingReport
                    ? "Update Report"
                    : "Save Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

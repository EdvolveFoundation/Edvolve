"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, FileText } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingReport, setEditingReport] =
    useState(null);

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    category: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const savedReports = JSON.parse(
      localStorage.getItem("reports") || "[]"
    );

    setReports(savedReports);
  }, []);

  const openAddModal = () => {
    setEditingReport(null);

    setFormData({
      title: "",
      year: "",
      category: "",
      description: "",
      link: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (report) => {
    setEditingReport(report);

    setFormData({
      title: report.title,
      year: report.year,
      category: report.category,
      description: report.description,
      link: report.link,
    });

    setIsModalOpen(true);
  };

  const saveReport = () => {
    if (
      !formData.title ||
      !formData.year ||
      !formData.category
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (editingReport) {
      const updatedReports = reports.map(
        (report) =>
          report._id === editingReport._id
            ? {
                ...report,
                ...formData,
              }
            : report
      );

      setReports(updatedReports);

      localStorage.setItem(
        "reports",
        JSON.stringify(updatedReports)
      );
    } else {
      const newReport = {
        _id: Date.now().toString(),
        ...formData,
      };

      const updatedReports = [
        ...reports,
        newReport,
      ];

      setReports(updatedReports);

      localStorage.setItem(
        "reports",
        JSON.stringify(updatedReports)
      );
    }

    setIsModalOpen(false);
  };

  const deleteReport = (id) => {
    const confirmDelete = window.confirm(
      "Delete this report?"
    );

    if (!confirmDelete) return;

    const updatedReports = reports.filter(
      (report) => report._id !== id
    );

    setReports(updatedReports);

    localStorage.setItem(
      "reports",
      JSON.stringify(updatedReports)
    );
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Reports & Publications
          </h1>

          <p className="text-gray-500 mt-1">
            Manage organizational reports and
            publications
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="
            bg-[#aa9e31]
            text-white
            px-5
            py-3
            rounded-lg
            hover:opacity-90
          "
        >
          Add Report
        </button>
      </div>

      {/* TABLE */}
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
                          onClick={() =>
                            openEditModal(
                              report
                            )
                          }
                          className="text-blue-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            deleteReport(
                              report._id
                            )
                          }
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
                      Click "Add Report" to
                      create your first report.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            p-4
            z-50
          "
        >
          <div
            className="
              bg-white
              w-full
              max-w-2xl
              rounded-2xl
              p-8
              shadow-2xl
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingReport
                ? "Edit Report"
                : "Add Report"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Report Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="2025"
                value={formData.year}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    year: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="Corporate Publication"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <textarea
                rows={4}
                placeholder="Report Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="PDF Link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    link: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() =>
                  setIsModalOpen(false)
                }
                className="
                  border
                  px-5
                  py-3
                  rounded-lg
                "
              >
                Cancel
              </button>

              <button
                onClick={saveReport}
                className="
                  bg-[#aa9e31]
                  text-white
                  px-5
                  py-3
                  rounded-lg
                "
              >
                {editingReport
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
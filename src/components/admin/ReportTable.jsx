"use client";

import { Trash2 } from "lucide-react";

export default function ReportTable({
  reports,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
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
              Link
            </th>
            <th className="p-4 text-center">
              Action
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
                <td className="p-4">
                  {report.title}
                </td>

                <td className="p-4">
                  {report.year}
                </td>

                <td className="p-4">
                  {report.category}
                </td>

                <td className="p-4">
                  {report.link}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      onDelete(report._id)
                    }
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="p-8 text-center text-gray-500"
              >
                No Reports Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
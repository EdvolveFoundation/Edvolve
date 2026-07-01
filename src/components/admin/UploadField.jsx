"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { uploadAdminFile } from "@/lib/upload-client";

export default function UploadField({
  label,
  value,
  onChange,
  folder,
  accept = "image/*",
  placeholder = "Paste URL or upload a file",
  inputClassName = "w-full border rounded-lg p-3",
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const url = await uploadAdminFile(file, folder);
      onChange(url);
      event.target.value = "";
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {label && (
        <label className="block mb-2 font-medium">
          {label}
        </label>
      )}

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClassName}
      />

      <label className="mt-3 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
        <Upload size={16} />
        {isUploading ? "Uploading..." : "Upload File"}
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </label>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export async function uploadAdminFile(file, folder = "edvolve") {
  if (!file) {
    return "";
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Unable to upload file.");
  }

  return data.upload?.url || "";
}

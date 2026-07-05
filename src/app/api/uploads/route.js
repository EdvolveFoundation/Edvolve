import { v2 as cloudinary } from "cloudinary";
import { requireAdminSession } from "@/lib/admin-session";
import { badRequest, handleRouteError, json } from "@/lib/api-utils";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

function configureCloudinary() {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
      secure: true,
    });
    return true;
  }

  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    return true;
  }

  return false;
}

function uploadBuffer(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    stream.end(buffer);
  });
}

export async function POST(request) {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  if (!configureCloudinary()) {
    return badRequest("Cloudinary is not configured.");
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder =
      formData.get("folder")?.toString().trim() || "edvolve";

    if (!(file instanceof File)) {
      return badRequest("A file is required.");
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return badRequest("Only image and PDF uploads are supported.");
    }

    if (file.size > MAX_FILE_SIZE) {
      return badRequest("File must be 10MB or smaller.");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadBuffer(buffer, {
      folder,
      resource_type: "auto",
      use_filename: true,
      unique_filename: true,
    });

    return json({
      upload: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        bytes: result.bytes,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

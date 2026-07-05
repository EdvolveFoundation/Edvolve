import {
  authErrorResponse,
  verifyPasswordResetOtp,
} from "@/lib/admin-auth";

export async function POST(request) {
  try {
    const body = await request.json();

    await verifyPasswordResetOtp({
      email: body.email,
      otp: body.otp,
      password: body.password,
    });

    return Response.json({
      ok: true,
      message: "Admin password has been reset.",
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}

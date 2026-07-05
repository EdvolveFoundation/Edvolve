import {
  authErrorResponse,
  verifySetupOtp,
} from "@/lib/admin-auth";

export async function POST(request) {
  try {
    const body = await request.json();

    await verifySetupOtp({
      email: body.email,
      otp: body.otp,
    });

    return Response.json({
      ok: true,
      message: "Admin password has been set.",
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}

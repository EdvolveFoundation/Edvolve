import {
  authErrorResponse,
  requestPasswordResetOtp,
} from "@/lib/admin-auth";

export async function POST(request) {
  try {
    const body = await request.json();

    await requestPasswordResetOtp({
      email: body.email,
    });

    return Response.json({
      ok: true,
      message: "Verification code sent.",
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}

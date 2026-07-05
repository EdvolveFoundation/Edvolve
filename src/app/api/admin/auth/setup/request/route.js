import {
  authErrorResponse,
  requestSetupOtp,
} from "@/lib/admin-auth";

export async function POST(request) {
  try {
    const body = await request.json();

    await requestSetupOtp({
      email: body.email,
      password: body.password,
    });

    return Response.json({
      ok: true,
      message: "Verification code sent.",
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}

import { OTP } from "../../../models/models";

export async function verifyOTP(
  _: any,
  { email, otp }: { email: string; otp: string }
): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();

  console.log("🔍 Verifying OTP for:", normalizedEmail, "with OTP:", otp);

  const record = await OTP.findOne({ email: normalizedEmail });

  if (!record) {
    console.log("No OTP record found");
    return false;
  }

  console.log("fetched OTP from DB:", {
    email: record.email,
    otp: record.otp,
    expiresAt: record.expiresAt,
    now: new Date(),
  });

  if (record.otp.toString() !== otp) {
    console.log("OTP mismatch");
    return false;
  }

  if (record.expiresAt < new Date()) {
    console.log("OTP expired");
    return false;
  }

  await OTP.deleteOne({ email: normalizedEmail });
  console.log("✅ OTP verified and record deleted");
  return true;
}

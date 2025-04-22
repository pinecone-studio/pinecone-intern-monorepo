import { OTP } from "../../../models/models";

export async function verifyOTP(
  _: any,
  { email, otp }: { email: string; otp: string }
): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();


  const record = await OTP.findOne({ email: normalizedEmail });

  if (!record) {
    return false;
  }

  if (record.otp.toString() !== otp) {
    return false;
  }

  if (record.expiresAt < new Date()) {
    return false;
  }

  await OTP.deleteOne({ email: normalizedEmail });
  return true;
}

import { randomInt } from 'crypto';
import { sendEmail } from './send-email';
import { OTP } from '../../../models/otp';

export async function requestOTP(_: unknown, { email }: { email: string }) {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const otp = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.findOneAndUpdate({ email: normalizedEmail }, { otp, expiresAt }, { upsert: true, new: true });

    await sendEmail(normalizedEmail, otp);
    return true;
  } catch (err) {
    return false;
  }
}

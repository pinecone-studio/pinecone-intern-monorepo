import { MutationResolvers } from '../../generated';
import { otpModel } from '../../models';
import { catchError } from '../../utils/catch-error';
import { findUserByEmail } from '../../utils/find-user-by-email';
import { sendMail } from '../../utils/send-otp';

export const OTP: MutationResolvers['OTP'] = async (_, { email }) => {
  try {
    const user = await findUserByEmail(email);
    const otp = Math.round(Math.random() * 10000 + 99999);
    const newOtp = await otpModel.create({ user, otp });
    await sendMail(email, otp);

    return newOtp;
  } catch (err) {
    catchError(err);
  }
};

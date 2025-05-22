import { MutationResolvers } from '../../generated';
import { otpModel } from '../../models';
import { catchError } from '../../utils/catch-error';
import { DeleteOldOTPs } from '../../utils/delete-old-otps';

export const OtpStep2: MutationResolvers['OtpStep2'] = async (_, { email, otp }) => {
  try {
    await DeleteOldOTPs();
    const existingOtp = await otpModel.findOne({ otp }).populate('user');
    if (!existingOtp || existingOtp.user.email !== email) {
      throw new Error('Нэг удаагийн код таарсангүй!');
    }

    return existingOtp;
  } catch (err) {
    catchError(err);
  }
};

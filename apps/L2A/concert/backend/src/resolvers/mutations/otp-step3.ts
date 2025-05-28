import { MutationResolvers } from '../../generated';
import { otpModel, userModel } from '../../models';
import { catchError } from '../../utils/catch-error';
import { DeleteOldOTPs } from '../../utils/delete-old-otps';
import { hashPassword } from '../../utils/hash-password';

export const OtpStep3: MutationResolvers['OtpStep3'] = async (_, { email, otp, password }) => {
  try {
    await DeleteOldOTPs();
    const existingOtp = await otpModel.findOne({ otp }).populate('user');
    if (!existingOtp || existingOtp.user.email !== email) {
      throw new Error('Нэг удаагийн код таарсангүй!');
    }
    const encryptedPass = await hashPassword(password);

    const newPassUser = await userModel.findOneAndUpdate({ email }, { password: encryptedPass });
    return newPassUser;
  } catch (err) {
    catchError(err);
  }
};

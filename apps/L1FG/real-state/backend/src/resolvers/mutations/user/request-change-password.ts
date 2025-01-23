import { MutationResolvers, User } from '../../../generated';
import { generateOTP } from 'otp-agent';
import { UserModel } from '../../../models';
import { sendEmail } from '../../../library/nodemailer';

export const requestChangePassword: MutationResolvers['requestChangePassword'] = async (_, { input }) => {
  const { email } = input;

  const user: User | null = await UserModel.findOne({ email });

  if (!user) throw new Error('Бүртгэлтэй хаяг олдсонгүй шалгаад дахин оруулна уу !');

  const otp = generateOTP();

  await UserModel.findByIdAndUpdate(user._id, { $set: { otp: otp } }, { new: true });
  await sendEmail(email, `Your OTP is ${otp}`);

  return { email };
};

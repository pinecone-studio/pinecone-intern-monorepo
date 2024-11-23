import { MutationResolvers } from '../../../generated';
import bcrypt from 'bcrypt';
import { otpModel, userModel } from '../../../models';



export const signUp: MutationResolvers['signUp'] = async (_: unknown, { input }) => {
  const { email, otp, password } = input;

  const response = await otpModel.findOne({ email });

  if (!response) {
    throw new Error('No OTP found for the provided email');
  }

  if (otp !== response.otp) {
    throw new Error('Invalid OTP');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email: email,
    password: hashedPassword,
  });

  return {
    user: user,
    success: true,
    message: `User ${user.email} created successfully`,
  };
};


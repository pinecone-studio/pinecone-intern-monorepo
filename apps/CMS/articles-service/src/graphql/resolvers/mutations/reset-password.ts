/* eslint-disable complexity */

import { MutationResolvers } from '@/graphql/generated';
import { UserModel } from '@/models';
import { errorTypes, graphqlErrorHandler } from '../error';

export const resetPassword: MutationResolvers['resetPassword'] = async (_, { input }) => {
  try {
    const { email, code, newPassword } = input;

    const user = await UserModel.findOne({ email, otp: code });

    if (!user) return graphqlErrorHandler({ message: 'Нэг удаагын код буруу байна' }, errorTypes.NOT_FOUND);

    const currentTime = Math.floor(Date.now() / 1000);

    if (user.otpExpiresIn && currentTime > user.otpExpiresIn) {
      return graphqlErrorHandler({ message: 'Нэг удаагын кодны хугацаа дууссан байна' }, errorTypes.BAD_REQUEST);
    }

    await UserModel.updateOne(
      { email },
      {
        password: newPassword,
        updatedAt: new Date(),
        otp: null,
        otpExpiresIn: null,
      }
    );

    return { message: 'Нууц үг амжилттай шинэчлэгдлээ' };
  } catch (error) {
    return graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};

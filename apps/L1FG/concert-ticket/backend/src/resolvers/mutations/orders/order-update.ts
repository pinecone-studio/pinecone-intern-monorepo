import { MutationResolvers } from '../../../generated';
import { OrderModel, UserModel } from '../../../models';

export const orderUpdate: MutationResolvers['orderUpdate'] = async (_: unknown, { input }) => {
  const { newPhoneNumber, newEmail, userId } = input;

  const user = await UserModel.findById({ _id: userId });

  if (!user) throw new Error(' Хэрэглэгчийн имэйл олдсонгүй');

  const updateEmail = await UserModel.findByIdAndUpdate({ _id: userId }, { email: newEmail });

  await OrderModel.updateMany({ userID: userId }, { phoneNumber: newPhoneNumber });

  return updateEmail;
};

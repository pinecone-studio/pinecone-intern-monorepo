import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';
import bcrypt from 'bcryptjs';

export const updateUser: MutationResolvers['updateUser'] = async (_, { userId, input: { phoneNumber, email, password, profile, username } }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await UserModel.findByIdAndUpdate(userId, { $set: { phoneNumber, email, password: hashedPassword, profile, username } }, { new: true, runValidators: true });

  if (!updatedUser) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return updatedUser;
};

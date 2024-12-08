import { UserUpdateInput } from '../../../generated';
import { userModel } from '../../../models';
import { Context, User } from '../../../types';

const checkUserAuthentication = (user: User) => {
  if (!user || !user.userId) {
    throw new Error('User is not authenticated');
  }
};

const updateUserDetails = async (userId: string, input: UserUpdateInput) => {
  const { name, email, password, phone } = input;
  return await userModel.findByIdAndUpdate(
    { _id: userId },
    {
      name,
      email,
      password,
      phone,
      updatedAt: new Date(),
    },
    { new: true }
  );
};

export const updateUser = async (_: unknown, { input }: { input: UserUpdateInput }, { user }: Context) => {

  try {
    checkUserAuthentication(user);

    const updatedUser = await updateUserDetails(user.userId, input);

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

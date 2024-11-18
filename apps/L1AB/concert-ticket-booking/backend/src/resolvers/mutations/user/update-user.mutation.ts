

import { UserUpdateInput } from '../../../generated';
import {  userModel } from '../../../models';

export const updateUser = async (_: unknown, { input }: { input: UserUpdateInput }) => {
  try {
    const { name, email,password,phone  } = input;
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: input.userId},
      {
        name,
        email,
        password,
        phone,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (updatedUser) {
      return updatedUser;
    } else{
      throw new Error('User not found');
    }

  } catch (error) {
    throw new Error('Failed to update user');
  }
}
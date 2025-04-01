import mongoose from 'mongoose';
import { UserModel } from '../../../models';
import { catchError } from '../../../utils';
import { QueryResolvers, User } from '../../../generated';

export const getUser: QueryResolvers['getUser'] = async (_, { userId }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  try {
    const user = await UserModel.findById<User>(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw catchError(error);
  }
};

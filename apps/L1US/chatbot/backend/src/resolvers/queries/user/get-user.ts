import { QueryResolvers } from '../../../generated';
import { User } from '../../../models';
import { catchError } from '../../../utils';
import mongoose from 'mongoose';

export const getUser: QueryResolvers['getUser'] = async (_, { userId }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw catchError(error);
  }
};

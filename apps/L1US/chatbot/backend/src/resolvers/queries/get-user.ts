import { QueryResolvers } from '../../generated';
import { User } from '../../models';
import { catchError } from '../../utils';
import mongoose from 'mongoose';

export const getUser: QueryResolvers['getUser'] = async (_, { id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw catchError(error);
  }
};

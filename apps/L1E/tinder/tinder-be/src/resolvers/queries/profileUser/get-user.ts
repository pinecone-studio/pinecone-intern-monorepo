import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models/user.model';

export const getUserById: QueryResolvers['getUserById'] = async (_, { userId }) => {
  try {
    const user = await userModel.findById({ _id: userId });
    console.log(user);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);

    throw new Error('Failed to fetch user data. Please try again.');
  }
};

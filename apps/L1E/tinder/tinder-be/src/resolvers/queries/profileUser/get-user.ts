import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models/user/user.model';

const getUserById: QueryResolvers['getUserById'] = async (_, { userId }) => {
  console.log(userId);
  try {
    const user = await userModel.findById({ _id: userId });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user;
  } catch (error) {
    throw new Error('Failed to fetch user data. Please try again.');
  }
};

export default getUserById;

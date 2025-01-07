import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models/user/user.model';

export const getAllUsers: QueryResolvers['getAllUsers'] = async () => {
  try {
    const user = await userModel.find();
    return user;
  } catch (error) {
    throw new Error('Failed to get all users');
  }
};

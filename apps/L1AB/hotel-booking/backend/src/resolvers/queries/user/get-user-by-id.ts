import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const getUserById: QueryResolvers['getUserById'] = async (_, { _id }) => {
  try {
    const user = await userModel.findById(_id);
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by id ${_id}`)
  }
};

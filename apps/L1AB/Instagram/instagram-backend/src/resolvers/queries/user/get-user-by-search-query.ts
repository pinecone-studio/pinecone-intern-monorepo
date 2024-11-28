import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const getUserBySearch: QueryResolvers['getUserBySearch'] = async (_, { searchInput }) => {
  if (!searchInput) {
    return [];
  }

  const user = await userModel.find({ username: { $regex: searchInput, $options: 'i' } });

  if (!user) {
    throw new Error(`User with the search term "${searchInput}" does not exist.`);
  }

  return user;
};

import { QueryResolvers } from 'src/generated';
import { Usermodel } from 'src/models/user';

export const getUser: QueryResolvers['getUser'] = async (_, { _id }) => {
  const user = await Usermodel.findById(_id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

import { UserModel } from '@/model/user.model';
import { GraphQLError } from 'graphql';

export const getUsers = async () => {
  try {
    const users = await UserModel.find().populate('quiz');
    return users;
  } catch (error) {
    throw new GraphQLError('Error in get challenges query');
  }
};

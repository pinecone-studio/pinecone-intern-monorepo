import { UserModel } from '@/graphql/models/user.models';
import { GraphQLError } from 'graphql';
import { QueryResolvers } from '@/graphql/generated';

export const getUsers: QueryResolvers['getUsers'] = async () => {
  try {
    const results = await UserModel.find();
    return results;
  } catch (error) {
    throw new GraphQLError('can not find users');
  }
};

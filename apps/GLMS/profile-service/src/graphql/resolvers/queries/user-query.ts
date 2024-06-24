import { QueryResolvers } from '@/graphql/generated';
import glmsUserModel from '@/graphql/models/user.model';
import { GraphQLError } from 'graphql';

export const getGlmsUsers: QueryResolvers['getGlmsUsers'] = async () => {
  try {
    const users = await glmsUserModel.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Unsuccessful query');
  }
};

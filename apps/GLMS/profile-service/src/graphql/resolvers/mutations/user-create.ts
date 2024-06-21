import { MutationResolvers } from '@/graphql/generated';
import glmsUserModel from '@/graphql/models/user.model';
import { GraphQLError } from 'graphql';

export const createGlmsUser: MutationResolvers['createGlmsUser'] = async (_, { input }) => {
  try {
    const user = await glmsUserModel.create(input);
    if (!user) {
      throw new GraphQLError('Unsuccessful creation');
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Unseccessful create user');
  }
};

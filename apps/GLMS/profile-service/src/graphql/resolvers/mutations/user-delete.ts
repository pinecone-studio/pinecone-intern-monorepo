import { MutationResolvers } from '@/graphql/generated';
import glmsUserModel from '@/graphql/models/user.model';
import { GraphQLError } from 'graphql';

export const deleteGlmsUser: MutationResolvers['deleteGlmsUser'] = async (_, { _id }) => {
  try {
    const result = await glmsUserModel.findByIdAndDelete(_id);
    if (!result) {
      throw new GraphQLError('Could not delete GLMS user');
    }
    return result;
  } catch (error) {
    throw new GraphQLError('Could not delete GLMS user');
  }
};

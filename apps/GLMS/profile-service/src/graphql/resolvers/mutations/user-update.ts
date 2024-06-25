import { MutationResolvers } from '@/graphql/generated';
import glmsUserModel from '@/graphql/models/user.model';
import { GraphQLError } from 'graphql';

export const updateGlmsUser: MutationResolvers['updateGlmsUser'] = async (_, { _id, updateInput }) => {
  const { firstName, lastName, roles, password, email, avatar } = updateInput;
  try {
    const result = await glmsUserModel.findByIdAndUpdate(
      _id,
      {
        firstName,
        lastName,
        roles,
        email,
        password,
        avatar,
      },
      { new: true }
    );
    if (!result) {
      throw new GraphQLError('failed to update GLMS user');
    }
    return result;
  } catch (error) {
    throw new GraphQLError('database error');
  }
};

import { MutationResolvers } from '@/graphql/generated';
import { UserModel } from '@/graphql/models/user.models';
import { GraphQLError } from 'graphql';

export const updateUser: MutationResolvers['updateUser'] = async (_, { _id, updateInput }) => {
  const { firstName, lastName, roles, password, email } = updateInput;
  try {
    const result = await UserModel.findByIdAndUpdate(
      _id,
      {
        firstName,
        lastName,
        roles,
        password,
        email,
      },
      { new: true }
    );
    if (!result) {
      throw new GraphQLError('failed to update user');
    }
    return result;
  } catch (error) {
    throw new GraphQLError('database error');
  }
};

import { UserModel } from '@/graphql/models/user.models';
import { GraphQLError } from 'graphql';

export const updateUser = async (_, { _id, updateInput }) => {
  const { firstName, lastName, role, password, email } = updateInput;
  try {
    const result = await UserModel.findByIdAndUpdate(_id, {
      firstName,
      lastName,
      role,
      password,
      email,
    });
    if (!result) {
      throw new GraphQLError('failed to update user');
    }
    return result;
  } catch (error) {
    throw new GraphQLError('failed to update user');
  }
};

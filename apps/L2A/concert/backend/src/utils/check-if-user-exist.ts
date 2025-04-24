import { GraphQLError } from 'graphql';
import { UserModel } from '../models';

export const checkIfUserExist = async (input: string | number) => {
  const userExist = await UserModel.findOne({ input });
  if (userExist) {
    throw new GraphQLError('Хэрэглэгч бүртгэгдсэн байна.');
  }
};

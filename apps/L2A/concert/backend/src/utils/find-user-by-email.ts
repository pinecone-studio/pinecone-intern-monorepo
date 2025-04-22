import { GraphQLError } from 'graphql';
import { UserModel } from '../models';

export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new GraphQLError('Хэрэглэгч олдсонгүй');
  }
  return user;
};

import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models';

export const createUser: MutationResolvers['createUser'] = async (_, { input }) => {
  const user = await UserModel.create(input);

  return user;
};

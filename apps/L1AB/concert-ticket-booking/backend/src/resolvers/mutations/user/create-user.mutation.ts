import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const createUser: MutationResolvers[`createUser`] = async (_, { input }) => {
  const newUser = await userModel.create({
    ...input,
  });
  return newUser;
};

import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { email } = input;

  const user = await UserModel.findOne({ email });

  if (user) throw new Error('User already exists');

  const newUser = await UserModel.create({
    ...input,
  });

  return {
    user: newUser,
  };
};

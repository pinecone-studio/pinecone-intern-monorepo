import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models';

export const loginUser: MutationResolvers['loginUser'] = async (_, { input }) => {
  const { email, password } = input;

  const user = await UserModel.findOne({
    email,
    password,
  });

  return user;
};

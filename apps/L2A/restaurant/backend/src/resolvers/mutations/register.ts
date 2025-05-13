import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models/user.model';

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { username, email } = input;
  const user = await UserModel.create({ username, email });
  console.log('User created:', user);
  return user;
};

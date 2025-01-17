import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models/user.model';

export const login: MutationResolvers['login'] = async (_, { input }) => {
  const { email, password, phone } = input;
  let user = null;

  if (email) {
    user = await UserModel.findOne({
      email,
      password,
    });
  }

  if (phone) {
    user = await UserModel.findOne({
      phone,
      password,
    });
  }

  if (!user) throw new Error('Invalid credentials');

  return user;
};

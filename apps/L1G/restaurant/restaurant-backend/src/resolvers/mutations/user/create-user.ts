import { MutationResolvers } from 'src/generated';

import bcrypt from 'bcryptjs';
import { UserModel } from 'src/models/user.model';

export const createUser: MutationResolvers['createUser'] = async (_, { input: { email, password } }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({ email, password: hashedPassword });

  return newUser;
};

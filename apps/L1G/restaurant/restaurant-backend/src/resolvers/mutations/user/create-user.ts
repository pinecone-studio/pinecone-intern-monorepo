import { MutationResolvers } from 'src/generated';

import bcrypt from 'bcryptjs';
import { UserModel } from 'src/models/user.model';

export const createUser: MutationResolvers['createUser'] = async (_, { username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const author = await UserModel.create({ username, email, password: hashedPassword });

  return author;
};

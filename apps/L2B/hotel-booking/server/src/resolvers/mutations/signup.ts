import { MutationResolvers } from '../../generated';
import { userModel } from '../../models';
import bcrypt from 'bcrypt';

export const addUser: MutationResolvers['addUser'] = async (_, { email, password }) => {
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    throw new Error('User already exists.');
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({ email, password: encryptedPassword });
  return user;
};

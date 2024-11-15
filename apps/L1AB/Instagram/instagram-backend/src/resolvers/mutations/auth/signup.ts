import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';
import bcrypt from 'bcrypt';

export const signup: MutationResolvers['signup'] = async (_: unknown, { username, email, password, fullname }) => {
  const saltRounds = 12;
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hash: string = await bcrypt.hash(password, salt);
  const createUser = await userModel.create({
    email,
    username,
    password: hash,
    fullname,
  });
  return createUser;
};

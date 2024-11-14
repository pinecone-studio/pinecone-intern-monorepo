import { userModel } from '../../../models';
import jwt from 'jsonwebtoken';
import { MutationResolvers } from '../../../generated';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret';

export const login: MutationResolvers['login'] = async (_: unknown, { username, email, password }) => {
  const checkUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!checkUser) {
    throw new Error('User not found');
  }
  const isPasswordCorrect = await bcrypt.compare(password, checkUser.password);
  if (!isPasswordCorrect) {
    throw new Error('Username or password incorrect');
  }

  const token = jwt.sign({ ...checkUser }, JWT_SECRET);

  return {
    token,
    user: checkUser,
  };
};

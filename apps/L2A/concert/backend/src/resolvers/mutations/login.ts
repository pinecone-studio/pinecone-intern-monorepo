import { MutationResolvers } from '../../generated';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../../utils/find-email';

export const loginUser: MutationResolvers['loginUser'] = async (_, { email, password }) => {
  const user = await findUserByEmail(email);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  return { ...user, JWT: token };
};

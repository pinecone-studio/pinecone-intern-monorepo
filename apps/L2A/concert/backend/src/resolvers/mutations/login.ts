import { MutationResolvers } from '../../generated';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../../utils/find-user-by-email';
import { checkPassword } from '../../utils/check-password';

export const loginUser: MutationResolvers['loginUser'] = async (_, { email, password }) => {
  try {
    const user = await findUserByEmail(email);
    await checkPassword(password, user.password);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return { ...user, JWT: token };
  } catch (err) {
    throw new Error('Нэврэхэд алдаа гарлаа!');
  }
};

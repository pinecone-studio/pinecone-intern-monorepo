import { QueryResolvers } from '../../generated';
import { catchError } from '../../utils/catch-error';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../../utils/find-user-by-email';

export const GetUserInfo: QueryResolvers['GetUserInfo'] = async (_, { JWT }) => {
  try {
    const verify = jwt.verify(JWT, process.env.JWT_SECRET as string) as { id: string; email: string };
    const user = await findUserByEmail(verify.email);
    return user;
  } catch (err) {
    return catchError(err);
  }
};

import { QueryResolvers } from '../../generated';
import jwt from 'jsonwebtoken';
import { userModel } from '../../models';

export const getCurrentUser: QueryResolvers['getCurrentUser'] = async (_, { JWT }) => {
  try {
    const verify = jwt.verify(JWT, process.env.JWT_SECRET as string) as { id: string; email: string };
    const user = await userModel.findOne({ email: verify.email });
    return user;
  } catch {
    throw new Error('invalid token');
  }
};

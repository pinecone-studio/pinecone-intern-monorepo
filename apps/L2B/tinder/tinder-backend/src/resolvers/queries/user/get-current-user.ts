import jwt from 'jsonwebtoken';
import { userModel } from '../../../models';

export const getCurrentUser = async (_: unknown, { JWT }: { JWT: string }) => {
  const verify = jwt.verify(JWT, process.env.JWT_SECRET as string) as { _id: string };
  const user = await userModel.findById(verify._id);
  return user;
};

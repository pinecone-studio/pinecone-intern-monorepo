import { userModel } from '../../models';
import { generateToken, verifyPassword } from '../../utils/auth';

export const login = async (_: unknown, { email, password }: { email: string; password: string }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const valid = await verifyPassword(user, password);
  if (!valid) throw new Error('Invalid credentials');

  return {
    token: generateToken(user),
    user,
  };
};

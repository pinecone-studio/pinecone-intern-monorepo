import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login: MutationResolvers['login'] = async (_, { input }) => {
  const { email, password } = input;

  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('Хэрэглэгч олдсонгүй');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Нууц үг алдаатай байна');

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET!
  );

  return { user, token };
};

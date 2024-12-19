import { MutationResolvers } from '../../../generated';
import bcrypt from 'bcrypt';
import { userModel } from '../../../models/user.model';

export const createUser: MutationResolvers['createUser'] = async (_: unknown, { input }) => {
  const { email, password, fullname, username } = input;

  // const check = await userModel.findOne({ email });

  // if (check) {
  //   throw new Error('as');
  // } else {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    password: hashedPassword,
    fullname: fullname || '',
    username: username || '',
  });

  console.log(user);

  return user;
};
// };

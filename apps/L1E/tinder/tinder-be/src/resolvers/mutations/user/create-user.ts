import { MutationResolvers } from '../../../generated';
import bcrypt from 'bcrypt';
import { userModel } from '../../../models/user/user.model';

export const createUser: MutationResolvers['createUser'] = async (_: unknown, { input }) => {
  const { email, password, username, age, bio, hobby, interest, job, profession } = input;
  console.log({ email, password, username, age, bio, hobby, interest, job, profession });

  // const check = await userModel.findOne({ email });

  // if (check) {
  //   throw new Error('as');
  // } else {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    password: hashedPassword,
    username,
    age,
    bio,
    hobby,
    interest,
    job,
    profession,
  });

  return user;
};
// };

import { MutationResolvers } from '../../generated';
import bcrypt from 'bcrypt';
import { userModel } from '../../models/user.model';

export const createUser: MutationResolvers['createUser'] = async (_: unknown, { input }) => {
  const { email, password, fullname, username } = input;

  console.log('Input data:', email, password, fullname, username);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    password: hashedPassword,
    fullname: fullname || '', // Set to empty string if not provided
    username: username || '', // Set to empty string if not provided
  });

  // Return the user object, excluding the password
  return {
    ...user, // Convert Mongoose document to plain object
  };
};

import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';

export const checkPassword = async (password: string, userPassword: string) => {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) {
    throw new GraphQLError('Нууц үг буруу байна!');
  }
};

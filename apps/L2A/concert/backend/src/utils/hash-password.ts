import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
export const hashPassword = async (password: string): Promise<string> => {
  if (password.length < 8) {
    throw new GraphQLError('Нууц үг богинохон байна!');
  }
  const encryptedPass = await bcrypt.hash(password, 15);
  return encryptedPass;
};

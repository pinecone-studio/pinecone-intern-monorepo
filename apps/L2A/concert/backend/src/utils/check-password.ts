import bcrypt from 'bcrypt';

export const checkPassword = async (inputPassword: string, hash: string) => {
  const match = await bcrypt.compare(inputPassword, hash);
  if (!match) {
    throw new Error('Нууц үг буруу байна!');
  }
  return true;
};

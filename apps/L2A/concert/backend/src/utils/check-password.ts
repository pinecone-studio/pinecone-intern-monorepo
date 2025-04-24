import bcrypt from 'bcrypt';

export const checkPassword = async (password: string, userPassword: string) => {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }
};

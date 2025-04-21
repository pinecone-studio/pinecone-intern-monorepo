import bcrypt from 'bcrypt';
export const hashPassword = async (password: string): Promise<string> => {
  if (password.length < 8) {
    throw new Error('Бүртгүүлж чадсангүй!');
  }
  const encryptedPass = await bcrypt.hash(password, 15);
  return encryptedPass;
};

import bcrypt from 'bcrypt';
export const hashPassword = async ({ password }: { password: string }) => {
  const encryptedPass = await bcrypt.hash(password, 15);
  return encryptedPass;
};

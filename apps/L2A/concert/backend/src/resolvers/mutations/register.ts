import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models';
import bcrypt from 'bcrypt';
import { findUser } from '../../utils/find-user';

export const registerUser: MutationResolvers['addUser'] = async (_, { email, password }) => {
  if (!email || !password || password.length < 8) {
    throw new Error('Мэдээллээ гүйцээнэ үү. Эсвэл Пассвордоо шалгана уу.');
  }
  await findUser(email);
  const encryptedPassword = await bcrypt.hash(password, 15);
  const user = await UserModel.create({ email, password: encryptedPassword });
  return user;
};

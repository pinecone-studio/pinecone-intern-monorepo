import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models';
import { checkIfUserExist } from '../../utils/check-if-user-exist';
import { hashPassword } from '../../utils/hash-password';

export const registerUser: MutationResolvers['addUser'] = async (_, { email, password }) => {
  try {
    await checkIfUserExist(email);
    const encryptedPassword = await hashPassword(password);
    const user = await UserModel.create({ email, password: encryptedPassword });
    return user;
  } catch (err) {
    throw new Error('Бүртгүүлж чадсангүй!');
  }
};

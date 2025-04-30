import { MutationResolvers } from '../../generated';
import { userModel } from '../../models';
import { checkIfUserExist } from '../../utils/check-if-user-exist';
import { hashPassword } from '../../utils/hash-password';

export const addUser: MutationResolvers['addUser'] = async (_, { email, password }) => {
  try {
    await checkIfUserExist(email);
    const encryptedPassword = await hashPassword(password);
    const user = await userModel.create({ email, password: encryptedPassword });
    return user;
  } catch (err) {
    throw new Error('Бүртгүүлж чадсангүй!');
  }
};

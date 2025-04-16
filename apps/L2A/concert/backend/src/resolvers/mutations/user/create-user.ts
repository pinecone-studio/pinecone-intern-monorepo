import { GraphQLError } from 'graphql';
import { MutationResolvers, User } from '../../../generated';
import { UserModel } from '../../../models';
import { catchError } from '../../../utils/catch-error';
import bcrypt from 'bcrypt';
import { checkUserExist } from '../../../utils/check-user-exist';
export const createUser: MutationResolvers['createUser'] = async (_, { email, password, phone, username }) => {
  if (!email || !password || !phone || !username) {
    throw new GraphQLError('Мэдээлэл дутуу байна!');
  }
  try {
    await checkUserExist({ email, username, phone });
    const encryptedPass = await bcrypt.hash(password, 15);
    const newUser = await UserModel.create({ email, password: encryptedPass, phone, username });
    if (!newUser) {
      throw new GraphQLError('Бүртгүүлж чадсангүй!');
    }
    return newUser;
  } catch (err) {
    throw catchError(err);
  }
};

import { GraphQLError } from 'graphql';
import { MutationResolvers, User } from '../../../generated';
import { UserModel } from '../../../models';
import { catchError } from '../../../utils/catchError';
import bcrypt from 'bcrypt';
export const createUser: MutationResolvers['createUser'] = async (_, { email, password, phone, username }) => {
  console.log('aaa');
  if (!email || !password || !phone || !username) {
    throw new GraphQLError('Мэдээлэл дутуу байна!');
  }
  try {
    const userExist = await UserModel.findOne<User>({ $or: [{ email }, { username }, { phone }] });
    if (userExist) {
      throw new GraphQLError('Хэрэглэгч бүртгэлтэй байна!');
    }
    const encryptedPass = await bcrypt.hash(password, 15);
    const newUser = await UserModel.create({ email, password: encryptedPass, phone, username });
    console.log('user', newUser);

    if (!newUser) {
      throw new GraphQLError('Бүртгүүлж чадсангүй!');
    }
    return newUser;
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
};

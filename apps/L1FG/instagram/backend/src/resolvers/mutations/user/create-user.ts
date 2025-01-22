import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcrypt';
export const createUser: MutationResolvers['createUser'] = async (_, { input }) => {
  const { userName, fullName, password, email } = input;
  const foundUser = await UserModel.findOne({ email });
  if (foundUser) {
    throw new Error('Имэйл хэрэглэгдсэн байна !');
  }
  const userNameFound=await UserModel.findOne({userName})
  if(userNameFound)
  {
    throw new Error('Нэр хэрэглэгдсэн байна !')
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    userName,
    fullName,
    password: hashedPassword,
    email,
  });

  return user;
};

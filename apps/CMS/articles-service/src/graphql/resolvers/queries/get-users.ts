import { UserModel } from '@/model';

export const getUsers = async () => {
  const users = await UserModel.find();
  return users;
};

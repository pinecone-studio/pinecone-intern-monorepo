import { userModel } from '../../../models';

export const getUsers = async () => {
  const users = await userModel.find({});
  return users;
};

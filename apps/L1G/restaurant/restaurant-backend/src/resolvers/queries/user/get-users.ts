import { QueryResolvers } from '../../../generated';
import { UserModel } from 'src/models/user.model';

export const getUsers: QueryResolvers['getUsers'] = async () => {
  const users = await UserModel.find();

  if (!users) {
    throw new Error(`Users not found`);
  }

  return users;
};

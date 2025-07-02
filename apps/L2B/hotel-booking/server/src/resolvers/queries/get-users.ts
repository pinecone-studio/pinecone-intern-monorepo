import { QueryResolvers } from '../../generated';
import { userModel } from '../../models';

export const getUsers: QueryResolvers['getUsers'] = async () => {
  const users = await userModel.find({});
  return users;
};

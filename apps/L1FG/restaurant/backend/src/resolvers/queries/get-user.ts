import { QueryResolvers } from '../../generated';
import { UserModel } from '../../models';

export const getUser: QueryResolvers['getUser'] = async (_, _id) => {
  const user = await UserModel.findById(_id);
  return user;
};

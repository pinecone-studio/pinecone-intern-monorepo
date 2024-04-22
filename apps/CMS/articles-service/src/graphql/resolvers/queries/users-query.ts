import { QueryResolvers } from '@/graphql/generated';
import { UserModel } from '@/models';

export const getUsers: QueryResolvers['getUsers'] = async () => {
  const users = await UserModel.find({});

  return users;
};

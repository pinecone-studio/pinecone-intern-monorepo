import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const deleteAllSearchUser: MutationResolvers['deleteAllSearchUser'] = async (_, __, { userId }) => {
  const findUser = await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { savedUsers: [] } });

  return findUser;
};

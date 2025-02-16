import { FollowingTypeResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const user: FollowingTypeResolvers['user'] = async (parent, _, __) => {
  const User = await UserModel.findById(parent.targetId);
  return User;
};

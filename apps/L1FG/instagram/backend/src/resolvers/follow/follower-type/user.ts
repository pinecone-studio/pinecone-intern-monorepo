import { FollowerTypeResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const user: FollowerTypeResolvers['user'] = async (parent, _, __) => {
  const User = await UserModel.findById(parent.followerId);
  return User;
};

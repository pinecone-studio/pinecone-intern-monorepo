import { Follow, User } from '../../../../generated';
import { FollowerModel, UserModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { CreationError } from '../../../../utils/error';
/*eslint-disable*/
export const updateFollowFollowerUser = async (follow: Follow, followerUser: User, userId: string | null) => {
  try {
    let updatedFollowerUser = await UserModel.findByIdAndUpdate(userId, { $inc: { followingCount: 1 } }, { new: true });
    let updateFollowerTry = 0;
    while (!updatedFollowerUser || followerUser.followingCount >= updatedFollowerUser.followingCount) {
      if (updateFollowerTry > 1) {
        break;
      }
      updatedFollowerUser = await UserModel.findByIdAndUpdate(userId, { $inc: { followingCount: 1 } }, { new: true });
      updateFollowerTry++;
    }
    if (!updatedFollowerUser || followerUser.followingCount >= updatedFollowerUser.followingCount) {
      await FollowerModel.findByIdAndDelete(follow._id);
      throw new CreationError('Failed to follow');
    }
  } catch (error) {
    throw catchError(error);
  }
};

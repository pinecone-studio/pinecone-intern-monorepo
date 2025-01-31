import { Follow, User } from '../../../../generated';
import { FollowerModel, UserModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { CreationError } from '../../../../utils/error';
/*eslint-disable*/
export const updateFollowTargetUser = async (follow: Follow, targetUser: User, targetId: string) => {
  try {
    let updatedTargetUser: User | null = await UserModel.findByIdAndUpdate(targetId, { $inc: { followerCount: 1 } }, { new: true });
    let updateTargetTry = 0;
    while (!updatedTargetUser || targetUser.followerCount >= updatedTargetUser.followerCount) {
      if (updateTargetTry > 1) {
        break;
      }
      updatedTargetUser = await UserModel.findByIdAndUpdate(targetId, { $inc: { followerCount: 1 } }, { new: true });
      updateTargetTry++;
    }
    if (!updatedTargetUser || targetUser.followerCount >= updatedTargetUser.followerCount) {
      await FollowerModel.findByIdAndDelete(follow._id);
      throw new CreationError('Failed to follow');
    }
  } catch (error) {
    throw catchError(error);
  }
};

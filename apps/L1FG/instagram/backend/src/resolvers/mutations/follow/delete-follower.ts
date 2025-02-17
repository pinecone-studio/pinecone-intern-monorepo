import { MutationResolvers } from '../../../generated';
import { FollowerModel, UserModel } from '../../../models';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';

export const deleteFollower: MutationResolvers['deleteFollower'] = async (_, { followerId }, { userId }) => {
  authenticate(userId);

  try {
    const unFollow = await FollowerModel.findOneAndDelete({
      targetId: userId,
      followerId,
    });

    if (!unFollow) {
      throw new Error('Unfollow failed: No such follow relationship found.');
    }

    await UserModel.findByIdAndUpdate(userId, { $inc: { followerCount: -1 } });
    return {
      isFollowed: false,
      isRequested: false,
    };
  } catch (error) {
    throw catchError(error);
  }
};

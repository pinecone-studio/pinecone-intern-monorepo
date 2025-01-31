import { User } from '../../../../generated';
import { UserModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { UserNotFoundError } from '../../../../utils/error';

export const validateFollowUsers = async (userId: string | null, targetId: string): Promise<{ followerUser: User; targetUser: User }> => {
  try {
    const followerUser: User | null = await UserModel.findById(userId);
    if (!followerUser) {
      throw new UserNotFoundError('Follower user not found');
    }
    const targetUser: User | null = await UserModel.findById(targetId);
    if (!targetUser) {
      throw new UserNotFoundError('Target user not found');
    }
    return {
      followerUser,
      targetUser,
    };
  } catch (error) {
    throw catchError(error);
  }
};

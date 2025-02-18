import { Follow } from '../../../../generated';
import { FollowerModel, NotificationModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { CreationError } from '../../../../utils/error';

export const makeFollow = async (userId: string | null, targetId: string): Promise<Follow> => {
  try {
    const follow: Follow | null = await FollowerModel.create({
      followerId: userId,
      targetId,
    });
    if (!follow) {
      throw new CreationError('Failed to follow');
    }
    await NotificationModel.create({
      userId,
      ownerId: targetId,
      categoryType: 'REQUEST',
    });
    return follow;
  } catch (error) {
    throw catchError(error);
  }
};

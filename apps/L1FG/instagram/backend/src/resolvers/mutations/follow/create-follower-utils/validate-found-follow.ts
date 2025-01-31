import { FollowerModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { UserFoundError } from '../../../../utils/error';

export const validateFoundFollow = async (userId: string | null, targetId: string) => {
  try {
    const foundFollow = await FollowerModel.findOne({
      followerId: userId,
      targetId: targetId,
    });
    if (foundFollow) {
      throw new UserFoundError('Already followed');
    }
  } catch (error) {
    throw catchError(error);
  }
};

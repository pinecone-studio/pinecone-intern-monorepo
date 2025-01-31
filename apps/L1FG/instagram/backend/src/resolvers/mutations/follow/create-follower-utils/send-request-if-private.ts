import { User } from '../../../../generated';
import { RequestModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { CreationError, FoundError } from '../../../../utils/error';

// eslint-disable-next-line complexity
export const sendRequestIfPrivate = async (targetUser: User, userId: string | null, targetId: string): Promise<{ isFollowed: boolean; isRequested: boolean } | null> => {
  try {
    if (targetUser.isPrivate) {
      const requestFound = await RequestModel.findOne({
        from: userId,
        to: targetId,
      });
      if (requestFound) {
        throw new FoundError('Request has already made');
      }
      const newRequest = await RequestModel.create({
        from: userId,
        to: targetId,
      });
      if (!newRequest) {
        {
          throw new CreationError('Failed to request');
        }
      }
      return {
        isFollowed: false,
        isRequested: true,
      };
    }
    return null;
  } catch (error) {
    throw catchError(error);
  }
};

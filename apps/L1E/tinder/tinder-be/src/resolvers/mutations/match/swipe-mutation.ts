import { MutationResolvers } from '../../../generated';
import { matchModel } from '../../../models/user/match.model';
import { swipeModel } from '../../../models/user/swipe.model';

export const createSwipe: MutationResolvers['createSwipe'] = async (_: unknown, { input }) => {
  const { swipedId, swiperId, like } = input;

  const swipe = await swipeModel.create({
    swipedId,
    swiperId,
    like,
  });

  if (like) {
    const mutualSwipe = await swipeModel.findOne({
      swipedId: swipedId,
      swipedUserId: swiperId,
      like: true,
    });

    if (mutualSwipe) {
      await matchModel.create({
        userId: swiperId,
        targetUserId: swipedId,
        stillmatch: true,
      });
    }
  }
  return { ...swipe.toJSON(), _id: swipe._id.toString() };
};

import { QueryResolvers } from '../../../generated';
import { swipeModel } from '../../../models/user/swipe.model';

export const getSwipesByUser: QueryResolvers['getSwipesByUser'] = async (_, { userId }) => {
  return swipeModel.find({ swiperId: userId });
};

import { reviewModel, ReviewPopulatedType } from 'src/models';
import { QueryResolvers } from '../../../generated';

export const getReviews: QueryResolvers['getReviews'] = async () => {
  const reviews = await reviewModel.find().populate<ReviewPopulatedType>(['product', 'user']);
  return reviews;
};

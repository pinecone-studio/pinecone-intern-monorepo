import { reviewModel } from 'src/models';
import { QueryResolvers } from '../../../generated';

export const getReviews: QueryResolvers['getReviews'] = async () => {
  const reviews = await reviewModel.find().populate('product').populate('user');
  return reviews;
};

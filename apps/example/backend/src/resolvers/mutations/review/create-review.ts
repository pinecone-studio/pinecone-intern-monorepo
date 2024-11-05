import { reviewModel } from 'src/models';
import { MutationResolvers, Response } from '../../../generated';

export const createReview: MutationResolvers['createReview'] = async (_, { Review }, { userId }) => {
  const { productId, rating, comment } = Review[0];

  await reviewModel.create({
    user: userId,
    product: productId,
    rating,
    comment,
  });

  return Response.Success;
};

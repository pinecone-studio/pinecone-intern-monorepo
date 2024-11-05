import { GraphQLResolveInfo } from 'graphql';
import { getReviews } from 'src/resolvers/queries/review/get-reviews';
import { reviewModel } from 'src/models/review.model';

jest.mock('src/models/review.model', () => ({
  reviewModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn(function (field) {
        if (field === 'product') {
          return this;
        } else if (field === 'user') {
          return Promise.resolve([]);
        }
        return this;
      }),
    }),
  },
}));

describe('getReviews', () => {
  it('should get reviews and populate product and user fields', async () => {
    const response = await getReviews!({}, {}, { userId: '1' }, {} as GraphQLResolveInfo);
    expect(reviewModel.find).toHaveBeenCalled();
    expect(reviewModel.find().populate).toHaveBeenCalledWith('product');
    expect(reviewModel.find().populate).toHaveBeenCalledWith('user');
    expect(response).toEqual([]);
  });
});

import { GraphQLResolveInfo } from 'graphql';
import { getReviews } from 'src/resolvers/queries/review/get-reviews';
import { reviewModel } from 'src/models/review.model';

jest.mock('src/models/review.model', () => ({
  reviewModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([]), // Resolving to an empty array directly
    }),
  },
}));

describe('getReviews', () => {
  it('should get reviews and populate product and user fields', async () => {
    // Assert that getReviews is defined before calling
    expect(getReviews).toBeDefined();

    const response = await getReviews!({}, {}, { userId: '1' }, {} as GraphQLResolveInfo);

    expect(reviewModel.find).toHaveBeenCalled();
    expect(reviewModel.find().populate).toHaveBeenCalledWith(['product', 'user']);
    expect(response).toEqual([]); // Expected result is an empty array
  });
});

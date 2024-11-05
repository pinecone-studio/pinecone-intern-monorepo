import { GraphQLResolveInfo } from 'graphql';
import { createReview } from 'src/resolvers/mutations/review/create-review';
import { reviewModel } from 'src/models'; // Import the model to ensure it can be mocked

// Mock the review model create method
jest.mock('src/models', () => ({
  reviewModel: {
    create: jest.fn().mockResolvedValue({}),
  },
}));

describe('createReview', () => {
  it('should create a review', async () => {
    const reviewInput = [
      {
        productId: '1',
        rating: 2,
        comment: 'haha',
      },
    ];

    const response = await createReview?.({}, { Review: reviewInput }, { userId: 'id' }, {} as GraphQLResolveInfo);

    expect(response).toBe('Success');
    expect(reviewModel.create).toHaveBeenCalledWith({
      user: 'id',
      product: '1',
      rating: 2,
      comment: 'haha',
    });
  });
});

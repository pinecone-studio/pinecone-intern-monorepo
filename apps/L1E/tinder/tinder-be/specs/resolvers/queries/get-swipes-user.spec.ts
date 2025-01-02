import { GraphQLResolveInfo } from 'graphql';
import { getSwipesByUser } from '../../../src/resolvers/queries/user/swipe-query';
import { swipeModel } from '../../../src/models/user/swipe.model';

jest.mock('../../../src/models/user/swipe.model.ts', () => ({
  swipeModel: {
    find: jest.fn(),
  },
}));

describe('getSwipesByUser', () => {
  const mockSwipes = [
    { _id: '123', swiperId: 'user1', swipedId: 'user2', like: true, createdAt: new Date() },
    { _id: '124', swiperId: 'user1', swipedId: 'user3', like: false, createdAt: new Date() },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get swipes by user id', async () => {
    (swipeModel.find as jest.Mock).mockResolvedValueOnce(mockSwipes);

    const result = await getSwipesByUser!({}, { userId: 'user1' }, { req: undefined }, {} as GraphQLResolveInfo);

    expect(swipeModel.find).toHaveBeenCalledWith({ swiperId: 'user1' });
    expect(result).toEqual(mockSwipes);
  });
});

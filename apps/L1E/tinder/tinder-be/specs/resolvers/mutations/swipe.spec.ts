import { GraphQLResolveInfo } from 'graphql';
import { matchModel } from '../../../src/models/user/match.model';
import { swipeModel } from '../../../src/models/user/swipe.model';
import { createSwipe } from '../../../src/resolvers/mutations/match';

jest.mock('../../../src/models/user/swipe.model');
jest.mock('../../../src/models/user/match.model');

describe('createSwipe', () => {
  const mockSwipe = {
    _id: 'swipeId',
    swiperId: 'swiperId',
    swipedId: 'swipedId',
    like: true,
    createdAt: new Date(),
    toJSON: jest.fn().mockReturnValue({
      _id: 'swipeId',
      swiperId: 'swiperId',
      swipedId: 'swipedId',
      like: true,
      createdAt: new Date(),
    }),
  };

  const mockMatch = {
    _id: 'matchId',
    userId: 'swiperId',
    targetUserId: 'swipedId',
    stillmatch: true,
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a swipe and a match if mutual like', async () => {
    (swipeModel.create as jest.Mock).mockResolvedValue(mockSwipe);
    (swipeModel.findOne as jest.Mock).mockResolvedValue(mockSwipe);
    (matchModel.create as jest.Mock).mockResolvedValue(mockMatch);

    const input = { swipedId: 'swipedId', swiperId: 'swiperId', like: true };
    const result = await createSwipe!(
      {},
      { input },
      {
        req: undefined,
      },
      {} as GraphQLResolveInfo
    );

    expect(swipeModel.create).toHaveBeenCalledWith(input);
    expect(swipeModel.findOne).toHaveBeenCalledWith({
      swipedId: 'swipedId',
      swipedUserId: 'swiperId',
      like: true,
    });
    expect(matchModel.create).toHaveBeenCalledWith({
      userId: 'swiperId',
      targetUserId: 'swipedId',
      stillmatch: true,
    });
    expect(result).toEqual({ ...mockSwipe.toJSON(), _id: mockSwipe._id.toString() });
  });

  it('should create a swipe without a match if not mutual like', async () => {
    (swipeModel.create as jest.Mock).mockResolvedValue(mockSwipe);
    (swipeModel.findOne as jest.Mock).mockResolvedValue(null);

    const input = { swipedId: 'swipedId', swiperId: 'swiperId', like: true };
    const result = await createSwipe!({}, { input }, { req: undefined }, {} as GraphQLResolveInfo);

    expect(swipeModel.create).toHaveBeenCalledWith(input);
    expect(swipeModel.findOne).toHaveBeenCalledWith({
      swipedId: 'swipedId',
      swipedUserId: 'swiperId',
      like: true,
    });
    expect(matchModel.create).not.toHaveBeenCalled();
    expect(result).toEqual({ ...mockSwipe.toJSON(), _id: mockSwipe._id.toString() });
  });
});

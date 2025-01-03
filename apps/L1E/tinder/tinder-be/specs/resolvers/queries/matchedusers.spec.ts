import { GraphQLResolveInfo } from 'graphql';
import { getMatchedUsers } from '../../../src/resolvers/queries';
import { matchModel } from '../../../src/models/user/match.model';

jest.mock('../../../src/models/user/match.model', () => ({
  matchModel: {
    find: jest.fn(),
  },
}));

describe('getMatchedUsers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return matched users when authId is provided', async () => {
    const mockMatches = [
      {
        toObject: () => ({
          userId: 'user1',
          targetUserId: 'user2',
        }),
      },
      {
        toObject: () => ({
          userId: 'user1',
          targetUserId: 'user3',
        }),
      },
    ];

    (matchModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockMatches),
    });

    const result = await getMatchedUsers?.({}, { authId: 'user1' }, { req: {} }, {} as GraphQLResolveInfo);

    expect(matchModel.find).toHaveBeenCalledWith({ userId: 'user1' });
    expect(result).toEqual([
      { userId: 'user1', targetUserId: 'user2' },
      { userId: 'user1', targetUserId: 'user3' },
    ]);
  });

  // it('should throw an error if no authId is provided', async () => {
  //   await expect(getMatchedUsers?.({}, { authId: '' }, { req: {} }, {} as GraphQLResolveInfo)).rejects.toThrow("Cannot read properties of undefined (reading 'populate')");
  // });

  it('should handle database errors', async () => {
    (matchModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error('Database error')),
    });

    await expect(getMatchedUsers?.({}, { authId: 'user1' }, { req: undefined }, {} as GraphQLResolveInfo)).rejects.toThrow('Database error');
  });
});

import { GraphQLResolveInfo } from 'graphql';
import { matchModel } from '../../../src/models/user/match.model';
import { matchUsersCreate } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/user/match.model', () => ({
  matchModel: {
    create: jest.fn().mockResolvedValue({}),
  },
}));

describe('matchUsersCreate', () => {
  const mockMatchModelCreate = matchModel.create as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a match successfully', async () => {
    const input = {
      userId: 'user1',
      targetUserId: 'user2',
      stillmatch: true,
    };

    const mockMatch = {
      _id: 'match1',
      userId: 'user1',
      targetUserId: 'user2',
      stillmatch: true,
      toObject: jest.fn().mockReturnValue({
        userId: 'user1',
        targetUserId: 'user2',
        stillmatch: true,
      }),
    };

    mockMatchModelCreate.mockResolvedValue(mockMatch);

    const result = await matchUsersCreate!(
      {},
      { input },
      {
        req: undefined,
      },
      {} as GraphQLResolveInfo
    );

    expect(mockMatchModelCreate).toHaveBeenCalledWith({
      userId: 'user1',
      targetUserId: 'user2',
      stillmatch: true,
    });

    expect(result).toEqual({
      _id: 'match1',
      userId: 'user1',
      targetUserId: 'user2',
      stillmatch: true,
    });
  });

  it('should throw an error if match creation fails', async () => {
    const input = {
      userId: 'user1',
      targetUserId: 'user2',
      stillmatch: true,
    };
    mockMatchModelCreate.mockRejectedValue(new Error('Failed to create match'));
    await expect(
      matchUsersCreate!(
        {},
        { input },
        {
          req: undefined,
        },
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Already matched or failed to create match');
  });
});

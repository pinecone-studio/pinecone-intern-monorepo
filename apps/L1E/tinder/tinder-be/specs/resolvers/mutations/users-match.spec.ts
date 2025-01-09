import { matchModel } from '../../../src/models/user/match.model';
import { matchUsersCreate } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/user/match.model', () => ({
  matchModel: {
    create: jest.fn(),
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

    const mockPopulatedMatch = {
      _id: 'match1',
      userId: { _id: 'user1', username: 'User 1' },
      targetUserId: { _id: 'user2', username: 'User 2' },
      stillmatch: true,
      toObject: jest.fn().mockReturnValue({
        _id: 'match1',
        userId: { _id: 'user1', username: 'User 1' },
        targetUserId: { _id: 'user2', username: 'User 2' },
        stillmatch: true,
      }),
    };

    const mockMatch = {
      _id: 'match1',
      userId: 'user1',
      targetUserId: 'user2',
      stillmatch: true,
      populate: jest.fn().mockResolvedValue(mockPopulatedMatch),
    };

    mockMatchModelCreate.mockResolvedValue(mockMatch);

    const result = await matchUsersCreate!({}, { input });

    expect(mockMatchModelCreate).toHaveBeenCalledWith({
      userId: 'user1',
      targetUserId: 'user2',
      stillmatch: true,
    });

    expect(mockMatch.populate).toHaveBeenCalledWith('userId targetUserId');

    expect(result).toEqual({
      _id: 'match1',
      userId: { _id: 'user1', username: 'User 1' },
      targetUserId: { _id: 'user2', username: 'User 2' },
      stillmatch: true,
    });
  });

  it('should throw an error if match creation fails', async () => {
    const input = {
      userId: 'user1',
      targetUserId: 'user2',
      stillmatch: true,
    };
    mockMatchModelCreate.mockRejectedValue(new Error('Already matched or failed to create match'));
    await expect(matchUsersCreate!({}, { input })).rejects.toThrow('Already matched or failed to create match');
  });
});

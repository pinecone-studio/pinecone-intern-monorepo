import { matchModel } from 'apps/L1E/tinder/tinder-be/src/models/user/match.model';
import { matchUsersCreate } from 'apps/L1E/tinder/tinder-be/src/resolvers/mutations';

jest.mock('apps/L1E/tinder/tinder-be/src/models/user/match.model', () => ({
  matchModel: {
    create: jest.fn(),
  },
}));

describe('matchUsersCreate resolver', () => {
  it('should successfully create a match and return the populated match object when toObject exists', async () => {
    const input = {
      userId: 'user-id-1',
      targetUserId: 'user-id-2',
      stillmatch: true,
    };

    const mockPopulatedMatch = {
      _id: { toString: () => 'match-id' },
      userId: { _id: 'user-id-1', username: 'User 1' },
      targetUserId: { _id: 'user-id-2', username: 'User 2' },
      stillmatch: true,
      toObject: jest.fn().mockReturnValue({
        _id: { toString: () => 'match-id' },
        userId: { _id: 'user-id-1', username: 'User 1' },
        targetUserId: { _id: 'user-id-2', username: 'User 2' },
        stillmatch: true,
      }),
    };

    const mockMatchedUser = {
      _id: { toString: () => 'match-id' },
      userId: 'user-id-1',
      targetUserId: 'user-id-2',
      stillmatch: true,
      populate: jest.fn().mockResolvedValue(mockPopulatedMatch),
    };

    (matchModel.create as jest.Mock).mockResolvedValue(mockMatchedUser);

    const result = await matchUsersCreate!({}, { input });

    expect(result).toEqual({
      _id: 'match-id',
      userId: { _id: 'user-id-1', username: 'User 1' },
      targetUserId: { _id: 'user-id-2', username: 'User 2' },
      stillmatch: true,
    });

    expect(mockMatchedUser.populate).toHaveBeenCalledWith('userId targetUserId');
    expect(mockPopulatedMatch.toObject).toHaveBeenCalled();
  });

  it('should successfully create a match and return the populated match object when toObject does not exist', async () => {
    const input = {
      userId: 'user-id-1',
      targetUserId: 'user-id-2',
      stillmatch: true,
    };

    const mockPopulatedMatch = {
      _id: { toString: () => 'match-id' },
      userId: { _id: 'user-id-1', username: 'User 1' },
      targetUserId: { _id: 'user-id-2', username: 'User 2' },
      stillmatch: true,
    };

    const mockMatchedUser = {
      _id: { toString: () => 'match-id' },
      userId: 'user-id-1',
      targetUserId: 'user-id-2',
      stillmatch: true,
      populate: jest.fn().mockResolvedValue(mockPopulatedMatch),
    };

    (matchModel.create as jest.Mock).mockResolvedValue(mockMatchedUser);

    const result = await matchUsersCreate!({}, { input });

    expect(result).toEqual({
      _id: 'match-id',
      userId: { _id: 'user-id-1', username: 'User 1' },
      targetUserId: { _id: 'user-id-2', username: 'User 2' },
      stillmatch: true,
    });

    expect(mockMatchedUser.populate).toHaveBeenCalledWith('userId targetUserId');
  });

  it('should throw an error if the match cannot be created (already matched)', async () => {
    const input = {
      userId: 'user-id-1',
      targetUserId: 'user-id-2',
      stillmatch: true,
    };

    (matchModel.create as jest.Mock).mockRejectedValue(new Error('Already matched or failed to create match'));

    await expect(matchUsersCreate!({}, { input })).rejects.toThrow('Already matched or failed to create match');
  });

  it('should handle errors during the match creation process', async () => {
    const input = {
      userId: 'user-id-1',
      targetUserId: 'user-id-2',
      stillmatch: true,
    };

    (matchModel.create as jest.Mock).mockRejectedValue(new Error('An unexpected error occurred'));

    await expect(matchUsersCreate!({}, { input })).rejects.toThrow('An unexpected error occurred');
  });
});

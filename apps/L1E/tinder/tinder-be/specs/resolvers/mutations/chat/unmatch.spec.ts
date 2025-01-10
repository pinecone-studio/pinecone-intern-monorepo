import { matchModel } from 'apps/L1E/tinder/tinder-be/src/models/user/match.model';
import { unMatch } from 'apps/L1E/tinder/tinder-be/src/resolvers/mutations';

jest.mock('apps/L1E/tinder/tinder-be/src/models/user/match.model', () => ({
  matchModel: {
    findOneAndDelete: jest.fn(),
  },
}));

describe('unMatch resolver', () => {
  it('should return an empty array when no match is found', async () => {
    (matchModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

    const result = await unMatch!(null, { authId: 'test-auth-id' });

    expect(result).toEqual([]);
  });

  it('should throw an error if the match object does not include _id', async () => {
    (matchModel.findOneAndDelete as jest.Mock).mockResolvedValue({});

    await expect(unMatch(null, { authId: 'test-auth-id' })).rejects.toThrow('Match object does not include required _id field.');
  });

  it('should return the match when it is successfully deleted', async () => {
    const mockMatch = { _id: 'test-match-id', targetUserId: 'test-auth-id' };
    (matchModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockMatch);

    const result = await unMatch(null, { authId: 'test-auth-id' });

    expect(result).toEqual([mockMatch]);
  });
});

import { matchModel } from 'apps/L1E/tinder/tinder-be/src/models/user/match.model';
import { unMatch } from 'apps/L1E/tinder/tinder-be/src/resolvers/mutations';
import ConversationModel from 'apps/L1E/tinder/tinder-be/src/models/chat/conversation.model';

jest.mock('apps/L1E/tinder/tinder-be/src/models/user/match.model', () => ({
  matchModel: {
    findOneAndDelete: jest.fn(),
  },
}));

jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/conversation.model', () => ({
  findOneAndDelete: jest.fn(),
}));

describe('unMatch resolver', () => {
  it('should throw an error if the match object does not include _id', async () => {
    (matchModel.findOneAndDelete as jest.Mock).mockResolvedValue({});

    await expect(unMatch(null, { authId: 'test-auth-id' })).rejects.toThrow(
      'Invalid match object, missing _id' // Updated error message
    );
  });

  it('should return the match when it is successfully deleted', async () => {
    const mockMatch = { _id: 'test-match-id', targetUserId: 'test-auth-id' };
    (matchModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockMatch);
    (ConversationModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

    const result = await unMatch(null, { authId: 'test-auth-id' });

    expect(result).toEqual([mockMatch]);
    expect(ConversationModel.findOneAndDelete).toHaveBeenCalledWith({
      userOne: 'test-auth-id',
    });
  });
});

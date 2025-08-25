import { ChatMessageModel } from 'src/models/chat-message';
import { markMessagesAsSeen } from 'src/resolvers/mutations';

jest.mock('src/models/chat-message');

describe('markMessagesAsSeen', () => {
  const matchId = 'match123';
  const userId = 'user456';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('marks messages as seen and returns true', async () => {
    (ChatMessageModel.updateMany as jest.Mock).mockResolvedValue({});

    const result = await markMessagesAsSeen({}, { matchId, userId });

    expect(result).toBe(true);

    expect(ChatMessageModel.updateMany).toHaveBeenCalledWith(
      {
        matchId,
        receiverId: userId,
        seen: false,
      },
      {
        $set: { seen: true },
      }
    );
  });

  it('throws if updateMany fails', async () => {
    (ChatMessageModel.updateMany as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(markMessagesAsSeen({}, { matchId, userId })).rejects.toThrow('DB error');
  });
});

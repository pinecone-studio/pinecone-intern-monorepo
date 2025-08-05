import mongoose from 'mongoose';
import { Usermodel } from 'src/models/user';
import { dislike } from 'src/resolvers/mutations/dislike';

jest.mock('src/models/user');

describe('dislike resolver', () => {
  const dislikedByUser = '686635c86dd3b66e6f34e1ca';
  const dislikeReceiver = '686635c86dd3b66e6f34e1cb';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('removes user from likedTo, likedBy, and matched arrays', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    const result = await dislike({}, { dislikedByUser, dislikeReceiver });

    expect(result).toBe('Dislike processed and removed from like/match lists');

    const calls = (Usermodel.findByIdAndUpdate as jest.Mock).mock.calls;

    expect(calls[0][0]).toBeInstanceOf(mongoose.Types.ObjectId);
    expect(calls[0][1]).toMatchObject({
      $pull: {
        likedTo: expect.any(mongoose.Types.ObjectId),
        matched: expect.any(mongoose.Types.ObjectId),
      },
    });

    expect(calls[1][0]).toBeInstanceOf(mongoose.Types.ObjectId);
    expect(calls[1][1]).toMatchObject({
      $pull: {
        likedBy: expect.any(mongoose.Types.ObjectId),
        matched: expect.any(mongoose.Types.ObjectId),
      },
    });
  });

  it('calls console.warn and throws on DB failure', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('DB failure'));

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      /* mock warn */
    });

    await expect(dislike({}, { dislikedByUser, dislikeReceiver })).rejects.toThrow('Failed to dislike user');
    expect(warnSpy).toHaveBeenCalledWith('Dislike mutation failed:', 'DB failure');

    warnSpy.mockRestore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

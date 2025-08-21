import mongoose from 'mongoose';
import { dislike } from 'src/resolvers/mutations/dislike';
import { Usermodel } from 'src/models/user';
import { MatchModel } from 'src/models/match';

jest.mock('src/models/user');
jest.mock('src/models/match');

describe('dislike resolver', () => {
  const dislikedByUser = '686635c86dd3b66e6f34e1ca';
  const dislikeReceiver = '686635c86dd3b66e6f34e1cb';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('removes user from likedTo and likedBy, and matchIds if matched', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(),
    };

    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});
    (MatchModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockMatch);
    (Usermodel.updateMany as jest.Mock).mockResolvedValue({});

    const result = await dislike({}, { dislikedByUser, dislikeReceiver });

    expect(result).toEqual({
      isMatch: false,
      message: 'Succesfully unmatched',
    });

    expect(Usermodel.findByIdAndUpdate).toHaveBeenCalledTimes(2);
    expect(Usermodel.findByIdAndUpdate).toHaveBeenCalledWith(expect.any(mongoose.Types.ObjectId), { $pull: { likedTo: expect.any(mongoose.Types.ObjectId) } });
    expect(Usermodel.findByIdAndUpdate).toHaveBeenCalledWith(expect.any(mongoose.Types.ObjectId), { $pull: { likedBy: expect.any(mongoose.Types.ObjectId) } });

    expect(MatchModel.findOneAndUpdate).toHaveBeenCalledWith(
      {
        users: {
          $all: [new mongoose.Types.ObjectId(dislikedByUser), new mongoose.Types.ObjectId(dislikeReceiver)],
        },
        unmatched: false,
      },
      { unmatched: true }
    );

    expect(Usermodel.updateMany).toHaveBeenCalledWith(
      {
        _id: {
          $in: [new mongoose.Types.ObjectId(dislikedByUser), new mongoose.Types.ObjectId(dislikeReceiver)],
        },
      },
      { $pull: { matchIds: mockMatch._id } }
    );
  });

  it('still succeeds if no match was found', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});
    (MatchModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    const result = await dislike({}, { dislikedByUser, dislikeReceiver });

    expect(result).toEqual({
      isMatch: false,
      message: 'Succesfully unmatched',
    });
    expect(Usermodel.updateMany).not.toHaveBeenCalled();
  });

  it('throws error and logs warning on DB failure', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('DB failure'));

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      // intentionally empty
    });

    await expect(dislike({}, { dislikedByUser, dislikeReceiver })).rejects.toThrow('Failed to dislike user');
    expect(warnSpy).toHaveBeenCalledWith('Dislike mutation failed:', 'DB failure');

    warnSpy.mockRestore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

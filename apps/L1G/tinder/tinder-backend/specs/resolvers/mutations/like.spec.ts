import mongoose from 'mongoose';
import { like } from 'src/resolvers/mutations/like';
import { Usermodel } from 'src/models/user';
import { MatchModel } from 'src/models/match';

jest.mock('src/models/user');
jest.mock('src/models/match');

describe('like resolver', () => {
  const likedByUser = new mongoose.Types.ObjectId().toString();
  const likeReceiver = new mongoose.Types.ObjectId().toString();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns match if user already liked back', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    const mockUserDoc = {
      likedTo: [new mongoose.Types.ObjectId(likedByUser)],
    };

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUserDoc),
    });

    const mockMatch = {
      _id: new mongoose.Types.ObjectId(),
      users: [likedByUser, likeReceiver],
    };

    (MatchModel.create as jest.Mock).mockResolvedValue(mockMatch);

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toEqual({
      isMatch: true,
      message: "It's a match! You can now chat!",
      matchId: mockMatch._id.toString(),
    });

    expect(Usermodel.findById).toHaveBeenCalledWith(new mongoose.Types.ObjectId(likeReceiver));
    expect(MatchModel.create).toHaveBeenCalledWith({
      users: [new mongoose.Types.ObjectId(likedByUser), new mongoose.Types.ObjectId(likeReceiver)],
    });
  });

  it("returns 'Like successful, waiting for a match.' if no match", async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    const mockUserDoc = {
      likedTo: [],
    };

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUserDoc),
    });

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toEqual({
      isMatch: false,
      message: 'Like successful, waiting for a match.',
      matchId: '',
    });
  });

  it('returns message and empty matchId if receiver user is not found', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(undefined),
    });

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toEqual({
      isMatch: false,
      message: 'Like successful, waiting for a match.',
      matchId: '',
    });
  });

  it('throws GraphQLError when DB failure occurs', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('DB failure'));

    await expect(like({}, { likedByUser, likeReceiver })).rejects.toThrow('Failed to like user');
  });
});

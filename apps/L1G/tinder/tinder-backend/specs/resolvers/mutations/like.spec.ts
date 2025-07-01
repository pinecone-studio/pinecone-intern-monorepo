import mongoose from 'mongoose';
import { like } from 'src/resolvers/mutations/like';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user');

describe('like resolver', () => {
  const likedByUser = new mongoose.Types.ObjectId().toString();
  const likeReceiver = new mongoose.Types.ObjectId().toString();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns match if user already liked back', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    const selectMock = jest.fn().mockReturnValue({
      likedTo: [new mongoose.Types.ObjectId(likedByUser)],
    });
    (Usermodel.findById as jest.Mock).mockReturnValue({ select: selectMock });

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toBe("🎉 It's a match!");
    expect(Usermodel.findById).toHaveBeenCalledWith(expect.anything());
    expect(selectMock).toHaveBeenCalledWith('likedTo');
  });

  it("returns 'Like recorded' if no match", async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    const selectMock = jest.fn().mockReturnValue({
      likedTo: [],
    });
    (Usermodel.findById as jest.Mock).mockReturnValue({ select: selectMock });

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toBe('👍 Like recorded successfully');
  });

  it('throws on DB failure', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('DB failure'));

    await expect(like({}, { likedByUser, likeReceiver })).rejects.toThrow('Failed to like user');
  });
});

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

    const mockUserDoc = {
      likedTo: [new mongoose.Types.ObjectId(likedByUser)],
    };

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUserDoc),
    });

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toBe("🎉 It's a match!");
    expect(Usermodel.findById).toHaveBeenCalledWith(new mongoose.Types.ObjectId(likeReceiver));
  });

  it("returns 'Like recorded' if no match", async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    const mockUserDoc = {
      likedTo: [],
    };

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUserDoc),
    });

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toBe('👍 Like recorded successfully');
  });
  it('returns "Like recorded" if receiver user is not found', async () => {
    const likedByUser = new mongoose.Types.ObjectId().toString();
    const likeReceiver = new mongoose.Types.ObjectId().toString();

    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(undefined),
    });

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toBe('👍 Like recorded successfully');
  });
  it('calls console.warn when DB failure occurs', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('DB failure'));
    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error('DB failure')),
    });
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      return;
    });
    await expect(like({}, { likedByUser, likeReceiver })).rejects.toThrow('Failed to like user');
    expect(warnSpy).toHaveBeenCalledWith('⚠️ Like mutation failed:', 'DB failure');
    warnSpy.mockRestore();
  });
});

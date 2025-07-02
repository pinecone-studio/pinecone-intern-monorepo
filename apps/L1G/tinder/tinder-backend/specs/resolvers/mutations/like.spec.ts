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

    const selectMock = jest.fn().mockResolvedValue(mockUserDoc);

    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: selectMock } as unknown as ReturnType<typeof Usermodel.find>);

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toBe("🎉 It's a match!");
    expect(Usermodel.findById).toHaveBeenCalledWith(new mongoose.Types.ObjectId(likeReceiver));
    expect(selectMock).toHaveBeenCalledWith('likedTo');
  });

  it("returns 'Like recorded' if no match", async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    const mockUserDoc = {
      likedTo: [],
    };

    const selectMock = jest.fn().mockResolvedValue(mockUserDoc);

    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: selectMock } as unknown as ReturnType<typeof Usermodel.find>);

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toBe('👍 Like recorded successfully');
  });
  it('returns "Like recorded" if receiver user is not found', async () => {
    const likedByUser = new mongoose.Types.ObjectId().toString();
    const likeReceiver = new mongoose.Types.ObjectId().toString();

    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    const selectMock = jest.fn().mockResolvedValue(undefined);

    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: selectMock } as unknown as ReturnType<typeof Usermodel.find>);

    const result = await like({}, { likedByUser, likeReceiver });

    expect(result).toBe('👍 Like recorded successfully');
  });
  it('calls console.warn when DB failure occurs', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('DB failure'));
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await expect(like({}, { likedByUser, likeReceiver })).rejects.toThrow('Failed to like user');
    expect(warnSpy).toHaveBeenCalledWith('⚠️ Like mutation failed:', 'DB failure');
    warnSpy.mockRestore();
  });
});

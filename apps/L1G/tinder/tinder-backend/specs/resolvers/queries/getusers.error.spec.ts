import { getusers } from 'src/resolvers/queries/getusers';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user');

type PopulateChain = {
  populate: (arg: unknown) => PopulateChain | { lean: jest.Mock };
  lean?: jest.Mock;
};

describe('getusers resolver (error/edge cases)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle users with undefined likedBy and likedTo', async () => {
    const mockUsers = [
      {
        _id: '60f1a5e9c9d8e72e5c9b1234',
        email: 'test@example.com',
        name: 'Test User',
        likedBy: undefined,
        likedTo: undefined,
      },
    ];
    const leanMock = jest.fn().mockResolvedValueOnce(mockUsers);
    const populateLikedToMock = jest.fn().mockReturnValueOnce({ lean: leanMock });
    const populateLikedByMock = jest.fn().mockReturnValueOnce({ populate: populateLikedToMock });
    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: populateLikedByMock } as unknown as ReturnType<typeof Usermodel.find>);
    const result = await getusers();
    expect(result).toEqual([
      {
        id: '60f1a5e9c9d8e72e5c9b1234',
        email: 'test@example.com',
        name: 'Test User',
        likedBy: [],
        likedTo: [],
      },
    ]);
  });

  it('should throw an error and warn when database query fails', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { /* noop */ });
    jest.spyOn(Usermodel, 'find').mockImplementationOnce(() => {
      throw new Error('DB failure');
    });
    await expect(getusers()).rejects.toThrow('DB failure');
    expect(warnSpy).toHaveBeenCalledWith('⚠️ Failed to fetch users:', 'DB failure');
    warnSpy.mockRestore();
  });

  it('calls console.warn when DB failure occurs', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { /* noop */ });
    jest.spyOn(Usermodel, 'find').mockImplementationOnce(() => {
      throw new Error('DB failure');
    });
    await expect(getusers()).rejects.toThrow('DB failure');
    expect(warnSpy).toHaveBeenCalledWith('⚠️ Failed to fetch users:', 'DB failure');
    warnSpy.mockRestore();
  });

  it('handles user with undefined likedBy and likedTo', async () => {
    const mockUsers = [
      {
        _id: '123',
        email: 'user@example.com',
        name: 'User',
        likedBy: undefined,
        likedTo: undefined,
      },
    ];
    const leanMock = jest.fn().mockResolvedValueOnce(mockUsers);
    const populateLikedToMock = jest.fn().mockReturnValueOnce({ lean: leanMock });
    const populateLikedByMock = jest.fn().mockReturnValueOnce({ populate: populateLikedToMock });
    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: populateLikedByMock } as unknown as ReturnType<typeof Usermodel.find>);
    const result = await getusers();
    expect(result).toEqual([
      {
        id: '123',
        email: 'user@example.com',
        name: 'User',
        likedBy: [],
        likedTo: [],
      },
    ]);
  });
}); 
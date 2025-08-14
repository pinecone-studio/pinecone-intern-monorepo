import { getusers } from 'src/resolvers/queries/getusers';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user');

describe('getusers resolver (error/edge cases)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function createPopulateChain(mockData: any) {
    const leanMock = jest.fn().mockResolvedValueOnce(mockData);
    const populate3 = jest.fn().mockReturnValueOnce({ lean: leanMock });
    const populate2 = jest.fn().mockReturnValueOnce({ populate: populate3 });
    const populate1 = jest.fn().mockReturnValueOnce({ populate: populate2 });
    return { populate1, populate2, populate3, leanMock };
  }

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

    const { populate1 } = createPopulateChain(mockUsers);

    jest.spyOn(Usermodel, 'find').mockReturnValue({
      populate: populate1,
    } as any);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '60f1a5e9c9d8e72e5c9b1234',
        email: 'test@example.com',
        name: 'Test User',
        likedBy: [],
        likedTo: [],
        images: [],
        matched: [],
      },
    ]);
  });

  it('should throw an error and warn when database query fails', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      // intentionally empty
    });
    jest.spyOn(Usermodel, 'find').mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    await expect(getusers()).rejects.toThrow('DB failure');

    expect(warnSpy).toHaveBeenCalledWith('⚠️ Failed to fetch users:', 'DB failure');

    warnSpy.mockRestore();
  });

  it('calls console.warn when DB failure occurs', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      // intentionally empty
    });
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

    const { populate1 } = createPopulateChain(mockUsers);

    jest.spyOn(Usermodel, 'find').mockReturnValue({
      populate: populate1,
    } as any);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '123',
        email: 'user@example.com',
        name: 'User',
        likedBy: [],
        likedTo: [],
        images: [],
        matched: [],
      },
    ]);
  });
});

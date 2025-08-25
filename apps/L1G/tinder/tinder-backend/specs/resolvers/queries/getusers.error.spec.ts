import { getusers } from 'src/resolvers/queries/getusers';
import { Usermodel } from 'src/models/user';
import mongoose from 'mongoose';

jest.mock('src/models/user');

interface IUserMock {
  _id: string | mongoose.Types.ObjectId;
  email: string;
  name: string;
  images?: string[] | null;
  likedBy?: IUserMock[] | null;
  likedTo?: IUserMock[] | null;
  matchIds?: IUserMock[] | null;
}

describe('getusers resolver (error/edge cases)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function createPopulateChain(mockData: IUserMock[]) {
    const leanMock = jest.fn().mockResolvedValueOnce(mockData);
    const populate3 = jest.fn().mockReturnValueOnce({ lean: leanMock });
    const populate2 = jest.fn().mockReturnValueOnce({ populate: populate3 });
    const populate1 = jest.fn().mockReturnValueOnce({ populate: populate2 });
    return { populate1, populate2, populate3, leanMock };
  }

  it('should handle users with undefined likedBy and likedTo', async () => {
    const mockUsers: IUserMock[] = [
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
    } as unknown as ReturnType<typeof Usermodel.find>);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '60f1a5e9c9d8e72e5c9b1234',
        email: 'test@example.com',
        name: 'Test User',
        dateOfBirth: undefined,
        genderPreferences: undefined,
        gender: undefined,
        bio: undefined,
        interests: undefined,
        profession: undefined,
        schoolWork: undefined,
        images: [],
        matchIds: [],
        likedBy: [],
        likedTo: [],
      },
    ]);
  });

  it('should throw an error and log when database query fails', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => void 0);
    jest.spyOn(Usermodel, 'find').mockImplementationOnce(() => {
      throw new Error('DB failure');
    });

    await expect(getusers()).rejects.toThrow('DB failure');

    expect(errorSpy).toHaveBeenCalledWith(
      '⚠️ Failed to fetch users:',
      expect.any(Error)
    );

    errorSpy.mockRestore();
  });

  it('handles user with undefined likedBy and likedTo (short id)', async () => {
    const mockUsers: IUserMock[] = [
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
    } as unknown as ReturnType<typeof Usermodel.find>);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '123',
        email: 'user@example.com',
        name: 'User',
        dateOfBirth: undefined,
        genderPreferences: undefined,
        gender: undefined,
        bio: undefined,
        interests: undefined,
        profession: undefined,
        schoolWork: undefined,
        images: [],
        matchIds: [],
        likedBy: [],
        likedTo: [],
      },
    ]);
  });

  it('should throw "Unknown error" when error is not instance of Error', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => void 0);
    jest.spyOn(Usermodel, 'find').mockImplementationOnce(() => {
      throw { foo: 'bar' }; // not instance of Error
    });

    await expect(getusers()).rejects.toThrow(
      'Unknown error while fetching users'
    );

    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });

  it('should not log error when NODE_ENV=production', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => void 0);
    jest.spyOn(Usermodel, 'find').mockImplementationOnce(() => {
      throw new Error('Silent DB failure');
    });

    await expect(getusers()).rejects.toThrow('Silent DB failure');
    expect(errorSpy).not.toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv;
    errorSpy.mockRestore();
  });
});
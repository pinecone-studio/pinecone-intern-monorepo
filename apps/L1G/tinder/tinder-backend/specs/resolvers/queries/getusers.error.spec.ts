import { getusers, mapSimpleUser, mapLikedByUsers, mapLikedToUsers, mapMatchedUsers } from 'src/resolvers/queries/getusers';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user', () => ({
  Usermodel: { find: jest.fn() },
}));

interface MockUser {
  _id: string;
  email: string;
  name: string;
  likedBy?: unknown;
  [key: string]: unknown;
}

interface MockError {
  foo: string;
}

function mockChain(result: MockUser[] | Error | MockError, reject = false) {
  const lean = reject ? jest.fn().mockRejectedValue(result) : jest.fn().mockResolvedValue(result);
  (Usermodel.find as jest.Mock).mockReturnValue({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({ lean }),
        }),
      }),
    }),
  });
}

describe('getusers resolver - errors & edge', () => {
  const originalEnv = process.env.NODE_ENV;
  
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('handles undefined likedBy/likedTo', async () => {
    mockChain([{ _id: '1', email: 't@test.com', name: 'Test', likedBy: undefined }]);
    const res = await getusers();
    expect(res[0].likedBy).toEqual([]);
  });

  it('throws DB error and logs in non-production', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    
    mockChain(new Error('DB fail'), true);
    await expect(getusers()).rejects.toThrow('DB fail');
    
    expect(consoleSpy).toHaveBeenCalledWith('⚠️ Failed to fetch users:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('throws "Unknown error" if not Error instance and logs', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    
    mockChain({ foo: 'bar' }, true);
    await expect(getusers()).rejects.toThrow('Unknown error while fetching users');
    
    expect(consoleSpy).toHaveBeenCalledWith('⚠️ Failed to fetch users:', { foo: 'bar' });
    consoleSpy.mockRestore();
  });

  it('does not log error in production environment', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    process.env.NODE_ENV = 'production';
    
    mockChain(new Error('Silent error'), true);
    await expect(getusers()).rejects.toThrow('Silent error');
    
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('handles error thrown during find operation setup', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    
    (Usermodel.find as jest.Mock).mockImplementation(() => {
      throw new Error('Find operation failed');
    });

    await expect(getusers()).rejects.toThrow('Find operation failed');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('mapSimpleUser transforms basic user', () => {
    const u = { _id: 'x', email: 'u@test.com', name: 'User' } as never;
    expect(mapSimpleUser(u)).toMatchObject({ id: 'x', email: 'u@test.com' });
  });

  it('mapping helpers return [] when null/invalid', () => {
    expect(mapLikedByUsers(null)).toEqual([]);
    expect(mapLikedToUsers(undefined as never)).toEqual([]);
    expect(mapMatchedUsers({} as never)).toEqual([]);
  });

  it('mapping helpers work with valid arrays', () => {
    const sampleUser = { _id: 'test', email: 'test@example.com', name: 'Test' } as never;
    
    expect(mapLikedByUsers([sampleUser])).toHaveLength(1);
    expect(mapLikedToUsers([sampleUser])).toHaveLength(1);
    expect(mapMatchedUsers([sampleUser])).toHaveLength(1);
  });

  it('mapping helpers handle non-array inputs', () => {
    expect(mapLikedByUsers('not-an-array' as never)).toEqual([]);
    expect(mapLikedToUsers(123 as never)).toEqual([]);
    expect(mapMatchedUsers(true as never)).toEqual([]);
  });
});
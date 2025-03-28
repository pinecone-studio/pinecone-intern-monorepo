/*eslint-disable*/
import { PostModel } from 'apps/L1FG/instagram/backend/src/models';
import { getPosts } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/models');
const inputAfterTrue = {
  after: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
  first: 1,
  searchingUserId: '6788c5e84282c4b2590a14b2',
};
const inputAfterFalse = {
  after: '',
  first: 3,
  searchingUserId: '6788c5e84282c4b2590a14b2',
};
describe('Get small posts v1', () => {
  it('Should throw an authorization error', async () => {
    if (!getPosts) {
      return;
    }
    const mockAuthenticate = jest.fn(() => {
      throw new Error('Та нэвтэрнэ үү');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    await expect(getPosts({}, { input: inputAfterTrue }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү');
    expect(authenticate).toHaveBeenCalledTimes(1);
    expect(authenticate).toHaveBeenCalledWith('13');
  });
  it('Should find be called with something when after is true', async () => {
    if (!getPosts) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockQuery = {
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([{ _id: '679b1f013deb1906420fce31', title: 'Mock Post' }]),
    };
    const mockFind = jest.fn().mockReturnValue(mockQuery);
    (PostModel.find as jest.Mock) = mockFind;
    (authenticate as jest.Mock) = mockAuthenticate;
    await getPosts({}, { input: inputAfterTrue }, { userId: '13' }, {} as GraphQLResolveInfo);
    expect(mockQuery.limit).toHaveBeenCalledTimes(1);
    expect(mockQuery.limit).toHaveBeenCalledWith(2);
    expect(mockQuery.sort).toHaveBeenCalledTimes(1);
    expect(mockQuery.sort).toHaveBeenCalledWith({ _id: -1 });
    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(mockFind).toHaveBeenCalledTimes(1);
  });
  it('SHould find be called with something when after is false', async () => {
    if (!getPosts) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockQuery = {
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([{ _id: '679b1f013deb1906420fce31', title: 'Mock Post' }]),
    };
    const mockFind = jest.fn().mockReturnValue(mockQuery);
    (PostModel.find as jest.Mock) = mockFind;
    (authenticate as jest.Mock) = mockAuthenticate;
    const result = await getPosts({}, { input: inputAfterFalse }, { userId: '13' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      edges: [
        {
          cursor: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
          node: { _id: '679b1f013deb1906420fce31', title: 'Mock Post' },
        },
      ],
      pageInfo: {
        startCursor: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
        endCursor: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
        hasNextPage: false,
      },
    });
    expect(mockQuery.limit).toHaveBeenCalledTimes(1);
    expect(mockQuery.limit).toHaveBeenCalledWith(4);
    expect(mockQuery.sort).toHaveBeenCalledTimes(1);
    expect(mockQuery.sort).toHaveBeenCalledWith({ _id: -1 });
    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(mockFind).toHaveBeenCalledWith({
      userId: '6788c5e84282c4b2590a14b2',
    });
  });
  it('SHould has nextpage', async () => {
    if (!getPosts) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockQuery = {
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([
        { _id: '679b1f013deb1906420fce31', title: 'Mock Post' },
        { _id: '6799daaf325cff479e52f64b', title: 'post 2' },
      ]),
    };
    const mockFind = jest.fn().mockReturnValue(mockQuery);
    (PostModel.find as jest.Mock) = mockFind;
    (authenticate as jest.Mock) = mockAuthenticate;
    const result = await getPosts({}, { input: inputAfterTrue }, { userId: '13' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      edges: [
        {
          cursor: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
          node: { _id: '679b1f013deb1906420fce31', title: 'Mock Post' },
        },
      ],
      pageInfo: {
        startCursor: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
        endCursor: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
        hasNextPage: true,
      },
    });
    expect(mockQuery.limit).toHaveBeenCalledTimes(1);
    expect(mockQuery.limit).toHaveBeenCalledWith(2);
    expect(mockQuery.sort).toHaveBeenCalledTimes(1);
    expect(mockQuery.sort).toHaveBeenCalledWith({ _id: -1 });
    expect(mockFind).toHaveBeenCalledTimes(1);
  });
  it('SHould return successfully when no post', async () => {
    if (!getPosts) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockQuery = {
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([]),
    };
    const mockFind = jest.fn().mockReturnValue(mockQuery);
    (PostModel.find as jest.Mock) = mockFind;
    (authenticate as jest.Mock) = mockAuthenticate;
    const result = await getPosts({}, { input: inputAfterTrue }, { userId: '13' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      edges: [],
      pageInfo: {
        startCursor: '',
        endCursor: '',
        hasNextPage: false,
      },
    });
    expect(mockQuery.limit).toHaveBeenCalledTimes(1);
    expect(mockQuery.limit).toHaveBeenCalledWith(2);
    expect(mockQuery.sort).toHaveBeenCalledTimes(1);
    expect(mockQuery.sort).toHaveBeenCalledWith({ _id: -1 });
    expect(mockFind).toHaveBeenCalledTimes(1);
  });
  it('SHould throw an error inside catch', async () => {
    if (!getPosts) {
      return;
    }
    const mockFind = jest.fn(() => {
      throw new Error('Error');
    });
    (PostModel.find as jest.Mock) = mockFind;
    await expect(getPosts({}, { input: inputAfterTrue }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
});

import { FollowerModel } from '../../../../src/models';
import { searchFollowers } from '../../../../src/resolvers/queries/follow/search-followers';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models');

describe('Search followers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should throw та нэвтэрнэ үү', async () => {
    if (!searchFollowers) return;
    await expect(searchFollowers({}, { userName: 'john' }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('та нэвтэрнэ үү');
  });
  it('Should successfully return ', async () => {
    if (!searchFollowers) return;
    (FollowerModel.aggregate as jest.Mock).mockResolvedValueOnce([
      {
        _id: '12',
      },
    ]);
    const result = await searchFollowers({}, { userName: 'john' }, { userId: '67af0aee891aa7126be2fba7' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      edges: [
        {
          cursor: '',
          node: {
            _id: '12',
          },
        },
      ],
      pageInfo: {
        startCursor: '',
        endCursor: '',
        hasNextPage: false,
      },
    });
  });
  it('Should catch error ', async () => {
    if (!searchFollowers) return;
    (FollowerModel.aggregate as jest.Mock) = jest.fn(() => {
      throw new Error('error');
    });
    await expect(searchFollowers({}, { userName: 'john' }, { userId: '67af0aee891aa7126be2fba7' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
});

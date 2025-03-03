import { FollowerModel } from '../../../../src/models';
import { searchFollowings } from '../../../../src/resolvers/queries/follow/search-followings';

import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Search followers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should throw та нэвтэрнэ үү', async () => {
    if (!searchFollowings) return;
    await expect(searchFollowings({}, { userName: 'john' }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('та нэвтэрнэ үү');
  });
  it('Should successfully return ', async () => {
    if (!searchFollowings) return;
    (FollowerModel.aggregate as jest.Mock).mockResolvedValueOnce([
      {
        _id: '12',
      },
    ]);
    const result = await searchFollowings({}, { userName: 'john' }, { userId: '67af0aee891aa7126be2fba7' }, {} as GraphQLResolveInfo);
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
    if (!searchFollowings) return;
    (FollowerModel.aggregate as jest.Mock) = jest.fn(() => {
      throw new Error('error');
    });
    await expect(searchFollowings({}, { userName: 'john' }, { userId: '67af0aee891aa7126be2fba7' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
});

import { FollowerModel, RequestModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { getFollowingSuggestion } from 'apps/L1FG/instagram/backend/src/resolvers/queries/user/get-following-suggestion';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Get following suggestion', () => {
  it('it should throw an authentication error', async () => {
    if (!getFollowingSuggestion) {
      return;
    }
    await expect(getFollowingSuggestion({}, {}, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү!');
  });
  it('Should return suggested users', async () => {
    if (!getFollowingSuggestion) {
      return;
    }
    const mockFollowerModelFind = jest.fn().mockResolvedValue([
      {
        _id: '23',
        followerId: '6789fe2e6ac4e4a4329b877d',
        targetId: '6789b1cf63e287cd542f691f',
      },
    ]);

    const mockRequestModelFind = jest.fn().mockResolvedValue([
      {
        _id: '12',
        from: '6789b1cf63e287cd542f691f',
        to: '6789fe2e6ac4e4a4329b877d',
        status: 'PENDING',
      },
    ]);

    const mockUserModelQuery = {
      limit: jest.fn().mockResolvedValueOnce([
        {
          _id: '6789b1cf63e287cd542f691f',
          userName: 'iam_tuugii',
        },
      ]),
    };
    (FollowerModel.find as jest.Mock) = mockFollowerModelFind;
    (RequestModel.find as jest.Mock) = mockRequestModelFind;
    (UserModel.find as jest.Mock).mockReturnValue(mockUserModelQuery);
    const result = await getFollowingSuggestion({}, {}, { userId: '6789b1cf63e287cd542f691f' }, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '6789b1cf63e287cd542f691f',
        userName: 'iam_tuugii',
      },
    ]);
    expect(mockRequestModelFind).toHaveBeenCalledTimes(1);
    expect(mockRequestModelFind).toHaveBeenCalledWith({ from: '6789b1cf63e287cd542f691f' });
  });
});

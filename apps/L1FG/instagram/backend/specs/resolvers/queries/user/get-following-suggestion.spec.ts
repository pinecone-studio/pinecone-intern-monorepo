import { FollowerModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
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
    const mockFollowerModelQuery = {
      select: jest.fn().mockResolvedValueOnce([{ _id: '12' }]),
    };
    const mockUserModelQuery = {
      limit: jest.fn().mockResolvedValueOnce([
        {
          _id: '345',
          userName: 'hi',
        },
      ]),
    };
    const mockFollowerModelFind = jest.fn().mockReturnValue(mockFollowerModelQuery);
    (FollowerModel.find as jest.Mock) = mockFollowerModelFind;
    (UserModel.find as jest.Mock).mockReturnValue(mockUserModelQuery);
    const result = await getFollowingSuggestion({}, {}, { userId: '13' }, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '345',
        userName: 'hi',
      },
    ]);
  });
});

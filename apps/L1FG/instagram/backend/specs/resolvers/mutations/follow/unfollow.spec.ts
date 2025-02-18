import { FollowerModel } from 'apps/L1FG/instagram/backend/src/models';
import { unfollow } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('unfollow', () => {
  it('delete follow', async () => {
    (FollowerModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

    if (!unfollow) return;

    const result = await unfollow({}, { followerId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);

    expect(result).toEqual(null);
  });
});

import { PostStats, PostUpdateInput } from 'apps/L1FG/real-state/backend/src/generated';
import { updatePostStatus } from 'apps/L1FG/real-state/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/real-state/backend/src/models/post-model', () => ({
  Post: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      _id: '67a9e37050068558424872fd',
      status: 'APPROVED',
    }),
  },
}));

describe('updatePostStatus Resolver', () => {
  it('should update post status', async () => {
    const mockinput: PostUpdateInput = {
      status: PostStats.Approved,
    };
    const context = {
      req: {
        user: { _id: '1' },
      },
      userId: '1',
    };

    const result = await updatePostStatus!({}, { input: mockinput, _id: '67a9e37050068558424872fd' }, context, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '67a9e37050068558424872fd',
      status: 'APPROVED',
    });
  });
});

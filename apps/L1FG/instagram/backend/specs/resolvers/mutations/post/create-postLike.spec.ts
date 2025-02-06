import { createPostLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  PostLikeModal: {
    create: jest.fn().mockReturnValue({
      _id: '12',
      userId: '23',
      postId: '12',
    }),
  },
  NotificationModel: {
    create: jest.fn().mockReturnValue({
      userId: '12',
      ownerId: '21',
      contentPostId: '11',
      categoryTyoe: 'POST_LIKE',
    }),
  },
}));

describe('Post like', () => {
  it('shoud create a post like', async () => {
    if (!createPostLike) {
      return;
    }
    const input = {
      postId: '1',
    };

    const result = await createPostLike({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '12',
      userId: '23',
      postId: '12',
    });
  });
  it('Should throw an authorization error', async () => {
    if (!createPostLike) {
      return;
    }
    const input = {
      postId: '1',
    };
    await expect(createPostLike({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});

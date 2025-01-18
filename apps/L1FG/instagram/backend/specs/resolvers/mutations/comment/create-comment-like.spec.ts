import { createCommentLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  CommentLikeModel: {
    create: jest.fn().mockReturnValue({
      _id: '1',
      userId: '1',
      commendId: '2',
    }),
  },
}));

describe('Comment', () => {
  it('Should create a comment', async () => {
    if (!createCommentLike) {
      return;
    }
    const input = {
      commentId: '',
    };
    const result = await createCommentLike({}, { input }, { userId: '1' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      userId: '1',
      commendId: '2',
    });
  });
  it('Should throw an unauthorized error', async () => {
    const input = {
      commentId: '',
    };
    if (!createCommentLike) {
      return;
    }
    await expect(createCommentLike({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});

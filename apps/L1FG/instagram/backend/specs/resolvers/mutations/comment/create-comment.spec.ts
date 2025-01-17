import { createComment } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models/comment.model', () => ({
  CommentModel: {
    create: jest.fn().mockReturnValue({
      _id: '1',
      comment: 'Hi how',
      userId: '1',
      postId: '2',
      createdAt: '2',
      updatedAt: '4',
    }),
  },
}));

describe('Comment', () => {
  it('should create a comment', async () => {
    const input = {
      comment: '',
      postId: '',
    };
    const result = await createComment!({}, { input }, { userId: 'userid' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      comment: 'Hi how',
      userId: '1',
      postId: '2',
      createdAt: '2',
      updatedAt: '4',
    });
  });
  it('Unauthorized', async () => {
    const input = {
      comment: '',
      postId: '',
    };
    await expect(createComment!({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});

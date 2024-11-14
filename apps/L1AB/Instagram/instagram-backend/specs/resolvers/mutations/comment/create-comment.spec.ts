import { createComment } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

const mock = {
  userId: '1',
  postId: '1',
  comment: 'test comment',
};

jest.mock('../../../../src/models', () => ({
  commentsModel: {
    create: jest.fn().mockResolvedValue({
      toObject: () => mock,
    }),
  },
}));

describe('leave comment on a post', () => {
  it('Should add comment on a post by an Id', async () => {
    const result = await createComment!(
      {},
      {
        input: {
          comment: mock.comment,
          userId: mock.userId,
          postId: mock.postId,
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual({
      userId: '1',
      postId: '1',
      comment: 'test comment',
    });
  });
});

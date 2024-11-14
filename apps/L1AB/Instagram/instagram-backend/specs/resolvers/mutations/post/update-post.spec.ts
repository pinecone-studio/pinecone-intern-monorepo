import { updatePostById } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  postsModel: {
    findByIdAndUpdate: jest.fn().mockResolvedValueOnce({ name: 'test' }).mockReturnValue(null),
  },
}));

describe('updatePost', () => {
  it('it should return updatedpost', async () => {
    const res = await updatePostById!(
      {},
      {
        postId: '1',
        input: {
          caption: 'hello',
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(res).toEqual({ name: 'test' });
  });

  it('it should throw an error', async () => {
    try {
      await updatePostById!(
        {},
        {
          postId: '1',
          input: {
            caption: 'hello',
          },
        },
        {},
        {} as GraphQLResolveInfo
      );
    } catch (error) {
      expect(error).toEqual(new Error('Post not found'));
    }
  });
});

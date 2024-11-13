import { deletePost, deleteUser } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  postsModel: {
    findByIdAndDelete: jest.fn().mockReturnValueOnce('Success').mockReturnValue(null),
  },
}));

describe('Delete post', () => {
  it('Should delete post', async () => {
    const result = await deletePost!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toBe('Success');
  });

  it('Should not delete post', async () => {
    try {
      await deletePost!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Post not found'));
    }
  });
});

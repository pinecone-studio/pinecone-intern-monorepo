import { likePost } from 'apps/L1AB/Instagram/instagram-backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  postsModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({ _id: '1', userId: '1', images: ['1', '2'], caption: 'test', likeCounts: 1, likedUsers: ['1'] })
      .mockReturnValueOnce({ _id: '1', userId: '1', images: ['1', '2'], caption: 'test', likeCounts: 1, likedUsers: ['1'] })
      .mockReturnValueOnce(undefined),
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({ _id: '1', userId: '1', images: ['1', '2'], caption: 'test', likeCounts: 1, likedUsers: ['1'] })
      .mockResolvedValueOnce({ _id: '2', userId: '2', images: ['1', '2'], caption: 'test', likeCounts: 1, likedUsers: ['1'] }),
  },
}));

describe('like post', () => {
  it('it should return successfully add', async () => {
    const res = await likePost!({}, { userId: '1', postId: '1' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({ _id: '1', userId: '1', images: ['1', '2'], caption: 'test', likeCounts: 1, likedUsers: ['1'] });
  });
  it('it should return successfully pull', async () => {
    const res = await likePost!({}, { userId: '500', postId: '1' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({ _id: '2', userId: '2', images: ['1', '2'], caption: 'test', likeCounts: 1, likedUsers: ['1'] });
  });

  it('it should throw an error', async () => {
    try {
      await likePost!({}, { userId: '1', postId: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Post not found'));
    }
  });
});

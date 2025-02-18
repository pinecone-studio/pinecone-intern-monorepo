import { getlikePost } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  PostLikeModal: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
      },
    ]),
  },
}));
describe('Get getcommentLike', () => {
  it('Should give getcommentLike', async () => {
    if (!getlikePost) {
      throw new Error('Function undefined');
    }
    const getpostLike = await getlikePost({}, { postId: '8' }, { userId: '3' }, {} as GraphQLResolveInfo);
    expect(getpostLike).toEqual([
      {
        _id: '1',
      },
    ]);
  });
  it('Should throw authorization error', async () => {
    if (!getlikePost) {
      throw new Error('Function undefined');
    }
    await expect(getlikePost({}, { postId: '8' }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});

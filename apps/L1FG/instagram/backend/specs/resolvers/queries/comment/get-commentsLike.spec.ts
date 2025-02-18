import { getCommentLikedPeople } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  CommentLikeModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
      },
    ]),
  },
}));
describe('Get getcommentLike', () => {
  it('Should give getcommentLike', async () => {
    if (!getCommentLikedPeople) {
      throw new Error('Function undefined');
    }
    const getcommentLike = await getCommentLikedPeople({}, { commentId: '8' }, { userId: '3' }, {} as GraphQLResolveInfo);
    expect(getcommentLike).toEqual([
      {
        _id: '1',
      },
    ]);
  });
  it('Should throw authorization error', async () => {
    if (!getCommentLikedPeople) {
      throw new Error('Function undefined');
    }
    await expect(getCommentLikedPeople({}, { commentId: '8' }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});

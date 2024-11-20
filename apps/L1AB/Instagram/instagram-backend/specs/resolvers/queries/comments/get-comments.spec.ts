import { getCommentsByPostId } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  commentsModel: {
    find: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockResolvedValueOnce([{ toObject: () => ({
            _id: "1"
       })}])
      }).mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({ toObject: () =>[] })
      })
  },
}));

describe('getCommentsByPostId', () => {
  it('should return successfully when comments are found', async () => {
     await getCommentsByPostId!({}, { postId: '1' }, {}, {} as GraphQLResolveInfo);
  });

  it('should throw an error when no comments are found', async () => {
    try {
      await getCommentsByPostId!({}, { postId: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('No comments found for this post.'));
    }
  });
});

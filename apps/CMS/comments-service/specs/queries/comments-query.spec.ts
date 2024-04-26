import { getComments } from '../../src/graphql/resolvers/queries/get-comment-query';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

const comments = [{ name: 'Nice' }, { name: 'Bad' }];

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    find: jest.fn().mockResolvedValueOnce(comments).mockRejectedValue(null),
  },
}));

describe('This query should return Comments', () => {
  it('should return comments', async () => {
    const result = await getComments!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(comments);
  });
  it('It should return error', async () => {
    try {
      await getComments!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in GetComments Query'));
    }
  });
});

import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getCommentsByArticleId } from '@/graphql/resolvers/queries';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    find: jest.fn(),
  },
}));
describe('This query should return comments by articleid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mock = [{ _id: 'asdf', name: 'adsf', email: 'asdfejf', comment: 'test', ipAddress: 'adf', createdAt: new Date(), articleId: '661c87fd6837efa536464d24' }];
  const mockArticleId = '661c87fd6837efa536464d24';
  jest.spyOn(CommentsModel, 'find').mockResolvedValue(mock);
  it('It should return comments by articleid from database', async () => {
    const comments = await getCommentsByArticleId!({}, { articleId: mockArticleId }, {}, {} as GraphQLResolveInfo);
    expect(comments).toEqual(mock);
  });
  it('It should return error', async () => {
    jest.spyOn(CommentsModel, 'find').mockRejectedValue(graphqlErrorHandler({ message: `cannot delete comment` }, errorTypes.INTERVAL_SERVER_ERROR));
    try {
      await getCommentsByArticleId!({}, { articleId: '' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: `cannot delete comment` }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

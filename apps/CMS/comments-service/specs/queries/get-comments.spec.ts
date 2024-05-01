import { getComments } from '@/graphql/resolvers/queries';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    find: jest.fn(),
  },
}));
describe('This query should return comments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mock = [{ _id: 'asdf', name: 'adsf', email: 'asdfejf', comment: 'test', ipAddress: 'adf', createdAt: new Date(), articleId: 'asdf' }];
  jest.spyOn(CommentsModel, 'find').mockResolvedValue(mock);
  it('It should return comments from database', async () => {
    const comments = await getComments!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(comments).toEqual(mock);
  });
  it('It should return error', async () => {
    jest.spyOn(CommentsModel, 'find').mockRejectedValue(new GraphQLError('Error in get comments query'));
    try {
      await getComments!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get comments query'));
    }
  });
});

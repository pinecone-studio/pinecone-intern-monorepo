import { getComments } from '@/graphql/resolvers/queries';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
 
jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    find: jest.fn().mockResolvedValueOnce([]),
  },
}));
 
jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    find: jest.fn().mockReturnValueOnce({
      limit: jest
        .fn()
        .mockReturnValueOnce({
          skip: jest.fn().mockResolvedValueOnce([{ _id: 'asdf', name: 'adsf', email: 'asdfejf', comment: 'test', ipAddress: 'adf', createdAt: new Date(), articleId: 'asdf' }]),
          exec: jest.fn().mockResolvedValueOnce([{ _id: 'asdf', name: 'adsf', email: 'asdfejf', comment: 'test', ipAddress: 'adf', createdAt: new Date(), articleId: 'asdf' }]),
        })
        .mockRejectedValueOnce(null),
    }),
  },
}));
describe('This query should return comments', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('1.should return comments if found', async () => {
    const comments = await getComments!({}, { input: { limit: 10, offset: 0 } }, {}, {} as GraphQLResolveInfo);
    expect(comments).toEqual([{ _id: 'asdf', name: 'adsf', email: 'asdfejf', comment: 'test', ipAddress: 'adf', createdAt: expect.any(Date), articleId: 'asdf' }]);
  },30000);
 
  it('2.should return GraphQLError if comments not found', async () => {
    try {
      await getComments!({}, { input: { limit: 10, offset: 0 } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get comments query'));
    }
  },30000);
});

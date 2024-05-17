import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getRepliesByCommentId } from '@/graphql/resolvers/queries/reply/get-replies-by-commentid';
import ReplyModel from '@/models/reply.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/reply.model', () => ({
  find: jest.fn(),
}));

describe('This query should replies by commentId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mock = [{ _id: 'asdf', commentId: '6628b35adfc5622cb34cedee', createdAt: new Date(), ipAddress: 'asdf', name: 'ace', parent: '', reply: 'asdf' }];
  it('should return by commentId and return its replies', async () => {
    jest.spyOn(ReplyModel, 'find').mockResolvedValueOnce(mock);
    const replies = await getRepliesByCommentId!({}, { commentId: mock[0].commentId }, {}, {} as GraphQLResolveInfo);
    expect(replies).toEqual(mock);
  });
  it('should return error if failed to return replies', async () => {
    jest.spyOn(ReplyModel, 'find').mockRejectedValueOnce(graphqlErrorHandler({ message: 'cannot get replies by commentId' }, errorTypes.INTERVAL_SERVER_ERROR));
    try {
      await getRepliesByCommentId!({}, { commentId: mock[0].commentId }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'cannot get replies by commentId' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

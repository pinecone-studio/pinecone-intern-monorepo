import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getRepliesByParentId } from '@/graphql/resolvers/queries';
import ReplyModel from '@/models/reply.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/reply.model', () => ({
  find: jest.fn(),
}));

describe('This query should replies by parentId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mock = [{ _id: 'asdf', commentId: '6628b35adfc5622cb34cedee', createdAt: new Date(), ipAddress: 'asdf', name: 'ace', parentId: '662fa126fc8ed6fdd88ace2f', reply: 'asdf' }];
  it('should return replies by parentId and return its replies', async () => {
    jest.spyOn(ReplyModel, 'find').mockResolvedValueOnce(mock);
    const replies = await getRepliesByParentId!({}, { parentId: mock[0].parentId }, {}, {} as GraphQLResolveInfo);
    expect(replies).toEqual(mock);
  });
  it('should return error if failed to return replies', async () => {
    jest.spyOn(ReplyModel, 'find').mockRejectedValueOnce(graphqlErrorHandler({ message: 'cannot get replies by parentId' }, errorTypes.INTERVAL_SERVER_ERROR));
    try {
      await getRepliesByParentId!({}, { parentId: mock[0].parentId }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'cannot get replies by parentId' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

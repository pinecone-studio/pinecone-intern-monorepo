import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getCommentsCountByStatus } from '@/graphql/resolvers/queries';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    countDocuments: jest.fn(),
  },
}));
describe('get comments by status query', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return comments count by status', async () => {
    jest.spyOn(CommentsModel, 'countDocuments').mockResolvedValueOnce(30);
    const status = 'NORMAL';
    const result = await getCommentsCountByStatus!({}, { status }, {}, {} as GraphQLResolveInfo);
    expect(CommentsModel.countDocuments).toHaveBeenCalledWith({ status });
    expect(result).toEqual({ count: 30 });
  });
  it('shoudl return error when failed to get comments count', async () => {
    const errorMessage = graphqlErrorHandler({ message: `cannot get comments count by status` }, errorTypes.INTERVAL_SERVER_ERROR);
    jest.spyOn(CommentsModel, 'countDocuments').mockRejectedValue(errorMessage);
    try {
      await getCommentsCountByStatus!({}, { status: '' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});

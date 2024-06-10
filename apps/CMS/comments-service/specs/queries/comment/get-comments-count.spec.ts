import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getCommentsCount } from '@/graphql/resolvers/queries';
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
    jest.spyOn(CommentsModel, 'countDocuments').mockResolvedValueOnce(0);
    jest.spyOn(CommentsModel, 'countDocuments').mockResolvedValueOnce(1);
    jest.spyOn(CommentsModel, 'countDocuments').mockResolvedValueOnce(2);
    const result = await getCommentsCount!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(CommentsModel.countDocuments).toHaveBeenCalledWith({ status: 'NORMAL' });
    expect(CommentsModel.countDocuments).toHaveBeenCalledWith({ status: 'HIDDEN' });
    expect(CommentsModel.countDocuments).toHaveBeenCalledWith({ status: 'DELETED' });
    expect(result).toEqual({ normalCount: 0, hiddenCount: 1, deletedCount: 2 });
  });
  it('shoudl return error when failed to get comments count', async () => {
    const errorMessage = graphqlErrorHandler({ message: `cannot get comments count by status` }, errorTypes.INTERVAL_SERVER_ERROR);
    jest.spyOn(CommentsModel, 'countDocuments').mockRejectedValue(errorMessage);
    try {
      await getCommentsCount!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});

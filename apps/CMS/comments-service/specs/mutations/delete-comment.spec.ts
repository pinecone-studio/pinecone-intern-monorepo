import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { deleteComment } from '@/graphql/resolvers/mutations';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('delete comment mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const deleteInput = { _id: 'test' };
  it('should delete comment by id and return its ID', async () => {
    jest.spyOn(CommentsModel, 'findByIdAndDelete').mockResolvedValue({
      _id: 'test',
    });
    const result = await deleteComment!({}, { deleteInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('test');
  });
  it('should return error when failed to delete comment', async () => {
    jest.spyOn(CommentsModel, 'findByIdAndDelete').mockRejectedValue(graphqlErrorHandler({ message: `cannot delete comment` }, errorTypes.INTERVAL_SERVER_ERROR));
    try {
      await deleteComment!({}, { deleteInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: `cannot delete comment` }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

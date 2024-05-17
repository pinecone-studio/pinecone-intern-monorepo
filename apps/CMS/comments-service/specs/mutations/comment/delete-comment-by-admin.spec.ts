import { CommentStatus } from '@/graphql/generated/index';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { deleteCommentByAdmin } from '@/graphql/resolvers/mutations/comment/delete-comment-by-admin';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));
describe('delete comment by admin mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should convert comment status to DELETED and return id', async () => {
    const id = '6628b35adfc5622cb34cedee';
    jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: id });
    const result = await deleteCommentByAdmin!({}, { id }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(id);
    expect(CommentsModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { status: CommentStatus.Deleted });
  });
  it('should return error when failed to convert status to DELETED', async () => {
    const errorMessage = graphqlErrorHandler({ message: `cannot remove comment by admin` }, errorTypes.INTERVAL_SERVER_ERROR);
    const id = '';
    try {
      await deleteCommentByAdmin!({}, { id }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});

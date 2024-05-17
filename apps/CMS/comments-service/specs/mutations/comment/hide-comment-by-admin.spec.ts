import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { hideCommentByAdmin } from '@/graphql/resolvers/mutations/comment/hide-comment-by-admin';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));
describe('hide comment by admin mutation', () => {
  it('should update comment status to HIDDEN and return id', async () => {
    const id = '6628b369dfc5622cb34cedf0';
    jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: id });
    const result = await hideCommentByAdmin!({}, { id }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(id);
    expect(CommentsModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { status: 'HIDDEN' });
  });
  it('should return error when failed to update status to HIDDEN', async () => {
    const id = '';
    const errorMessage = graphqlErrorHandler({ message: `cannot hide comment by admin` }, errorTypes.INTERVAL_SERVER_ERROR);
    try {
      await hideCommentByAdmin!({}, { id }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});

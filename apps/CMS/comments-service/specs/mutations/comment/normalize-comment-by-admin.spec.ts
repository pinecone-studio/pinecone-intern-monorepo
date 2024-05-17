import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { setCommentStatusToNormal } from '@/graphql/resolvers/mutations/comment/normalize-comment-by-admin';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));
describe('update comment status to normal mutation', () => {
  it('should update comment status to normal', async () => {
    const id = '6628b35adfc5622cb34cedee';
    jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: id });
    const result = await setCommentStatusToNormal!({}, { id }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(id);
    expect(CommentsModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { status: 'NORMAL' });
  });
  it('should return error when failed to update comment status to NOTMAL', async () => {
    const id = '';
    const errorMessage = graphqlErrorHandler({ message: `cannot convert comment status to normal` }, errorTypes.INTERVAL_SERVER_ERROR);
    try {
      await setCommentStatusToNormal!({}, { id }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});

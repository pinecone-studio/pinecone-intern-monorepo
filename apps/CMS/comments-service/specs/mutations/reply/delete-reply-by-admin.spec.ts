import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { deleteReplyByAdmin } from '@/graphql/resolvers/mutations/reply/delete-reply-by-admin';
import ReplyModel from '@/models/reply.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/reply.model', () => ({
  findByIdAndUpdate: jest.fn(),
}));
describe('update reply status by admin mutation', () => {
  it('should update reply status to DELETED', async () => {
    const id = '662fa120fc8ed6fdd88ace2d';
    jest.spyOn(ReplyModel, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: id });
    const result = await deleteReplyByAdmin!({}, { id }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(id);
    expect(ReplyModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { status: 'DELETED' });
  });
  it('should return error when failed to update reply status to DELETED', async () => {
    const id = '';
    const errorMessage = graphqlErrorHandler({ message: `cannot remove reply by admin` }, errorTypes.INTERVAL_SERVER_ERROR);
    try {
      await deleteReplyByAdmin!({}, { id }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});

import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { hideReplyByAdmin } from '@/graphql/resolvers/mutations';
import ReplyModel from '@/models/reply.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/reply.model', () => ({
  findByIdAndUpdate: jest.fn(),
}));
describe('update reply status to HIDDEN mutation', () => {
  it('should update comment status to HIDDEN and return id', async () => {
    const id = '662fa120fc8ed6fdd88ace2d';
    jest.spyOn(ReplyModel, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: id });
    const result = await hideReplyByAdmin!({}, { id }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(id);
    expect(ReplyModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { status: 'HIDDEN' });
  });
  it('should return error when failed to update reply status to HIDDEN', async () => {
    const id = '';
    const errorMessage = graphqlErrorHandler({ message: `cannot hide reply by admin` }, errorTypes.INTERVAL_SERVER_ERROR);
    try {
      await hideReplyByAdmin!({}, { id }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});

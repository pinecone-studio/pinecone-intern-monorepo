import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { deleteReply } from '@/graphql/resolvers/mutations/reply/delete-reply';
import { accessTokenAuth } from '@/middlewares/auth-token';
import ReplyModel from '@/models/reply.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/reply.model', () => ({
  findByIdAndDelete: jest.fn(),
}));
jest.mock('@/middlewares/auth-token', () => ({
  accessTokenAuth: jest.fn(),
}));

describe('delete reply mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const deleteInput = { _id: 'test' };
  it('should delete reply by id and return its ID', async () => {
    (accessTokenAuth as jest.Mock).mockImplementation(() => {});
    jest.spyOn(ReplyModel, 'findByIdAndDelete').mockResolvedValue({
      _id: 'test',
    });
    const result = await deleteReply!({}, { deleteInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('test');
  });
  it('should return error when failed to delete reply', async () => {
    jest.spyOn(ReplyModel, 'findByIdAndDelete').mockRejectedValue(graphqlErrorHandler({ message: `cannot delete reply` }, errorTypes.INTERVAL_SERVER_ERROR));
    try {
      await deleteReply!({}, { deleteInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: `cannot delete reply` }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

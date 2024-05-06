import ReplyModel from '../../../src/models/reply.model';
import { GraphQLResolveInfo } from 'graphql';
import { errorTypes, graphqlErrorHandler } from '../../../src/graphql/resolvers/error';
import { deleteReplyByAdmin } from '../../../src/graphql/resolvers/mutations/reply/remove-comment-by-admin';
jest.mock('@/models/reply.model', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('remove reply by admin mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockInput = {
    _id: '662fa126fc8ed6fdd88ace2f',
  };
  it('should find reply by id and update status return its id', async () => {
    const mockedModel = jest.spyOn(ReplyModel, 'findByIdAndUpdate').mockResolvedValueOnce(mockInput);
    const result = await deleteReplyByAdmin!({}, { removeInput: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(ReplyModel.findByIdAndUpdate).toHaveBeenCalledWith(mockInput._id, { status: 'DELETED' });
    expect(mockedModel).toHaveReturned();
    expect(result).toEqual(mockInput._id);
  });
  it('should return error when failed to remove', async () => {
    jest.spyOn(ReplyModel, 'findByIdAndUpdate').mockRejectedValueOnce(graphqlErrorHandler({ message: `cannot remove reply by admin` }, errorTypes.INTERVAL_SERVER_ERROR));
    const emptyInput = {
      _id: '',
    };
    await expect(deleteReplyByAdmin!({}, { removeInput: emptyInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError();
  });
});

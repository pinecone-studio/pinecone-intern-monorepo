import { GraphQLResolveInfo } from 'graphql';
import { setReplyStatusToNormal } from '../../../src/graphql/resolvers/mutations/reply/status-normalize-by-admin';
import ReplyModel from '../../../src/models/reply.model';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';

jest.mock('@/models/reply.model', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('convert reply status to normal resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should convert reply status to normal and return its id', async () => {
    const setReplyStatusInput = { _id: '662fa120fc8ed6fdd88ace2d' };
    const updatedRepyId = '662fa120fc8ed6fdd88ace2d';
    const mockedModel = jest.spyOn(ReplyModel, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: updatedRepyId });
    const result = await setReplyStatusToNormal!({}, { setReplyStatusInput }, {}, {} as GraphQLResolveInfo);
    expect(ReplyModel.findByIdAndUpdate).toHaveBeenCalledWith(setReplyStatusInput._id, { status: 'NORMAL' });
    expect(result).toEqual(updatedRepyId);
    expect(mockedModel).toHaveReturned();
  });
  it('should return error when failed to convert reply status to normal', async () => {
    jest.spyOn(ReplyModel, 'findByIdAndUpdate').mockRejectedValueOnce(graphqlErrorHandler({ message: `cannot convert reply status to normal` }, errorTypes.INTERVAL_SERVER_ERROR));
    const emptyInput = { _id: '' };
    try {
      await setReplyStatusToNormal!({}, { setReplyStatusInput: emptyInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: `cannot convert reply status to normal` }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

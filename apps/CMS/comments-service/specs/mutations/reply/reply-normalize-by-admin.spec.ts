import { GraphQLResolveInfo } from 'graphql';
import { setReplyStatusToNormal } from '../../../src/graphql/resolvers/mutations/reply/reply-normalize-by-admin';
import ReplyModel from '../../../src/models/reply.model';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { ReplyStatus } from '@/graphql/generated/index';

jest.mock('@/models/reply.model', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('convert reply status to normal resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should convert reply status to normal and return its id', async () => {
    const id = '662fa120fc8ed6fdd88ace2d';
    const mockedModel = jest.spyOn(ReplyModel, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: id });
    const result = await setReplyStatusToNormal!({}, { id }, {}, {} as GraphQLResolveInfo);
    expect(ReplyModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { status: ReplyStatus.Normal });
    expect(result).toEqual(id);
    expect(mockedModel).toHaveReturned();
  });
  it('should return error when failed to convert comment status to normal', async () => {
    jest.spyOn(ReplyModel, 'findByIdAndUpdate').mockRejectedValueOnce(graphqlErrorHandler({ message: `cannot convert reply status to normal` }, errorTypes.INTERVAL_SERVER_ERROR));
    const id = '';
    try {
      await setReplyStatusToNormal!({}, { id }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: `cannot convert reply status to normal` }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

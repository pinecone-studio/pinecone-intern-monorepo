import { GraphQLResolveInfo } from 'graphql';
import { setCommentStatusToNormal } from '../../../src/graphql/resolvers/mutations/comment/status-normalize-by-admin';
import { CommentsModel } from '../../../src/models/comment.model';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('convert comment status to normal resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should convert comment status to normal and return its id', async () => {
    const setCommentStatusInput = { _id: '6628b369dfc5622cb34cedf0' };
    const updatedCommentId = '6628b369dfc5622cb34cedf0';
    const mockedModel = jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: updatedCommentId });
    const result = await setCommentStatusToNormal!({}, { setCommentStatusInput }, {}, {} as GraphQLResolveInfo);
    expect(CommentsModel.findByIdAndUpdate).toHaveBeenCalledWith(setCommentStatusInput._id, { status: 'NORMAL' });
    expect(result).toEqual(updatedCommentId);
    expect(mockedModel).toHaveReturned();
  });
  it('should return error when failed to convert comment status to normal', async () => {
    jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockRejectedValueOnce(graphqlErrorHandler({ message: `cannot convert comment status to normal` }, errorTypes.INTERVAL_SERVER_ERROR));
    const emptyInput = { _id: '' };
    try {
      await setCommentStatusToNormal!({}, { setCommentStatusInput: emptyInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: `cannot convert comment status to normal` }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

import { GraphQLResolveInfo } from 'graphql';
import { setCommentStatusToNormal } from '../../../src/graphql/resolvers/mutations/comment/';
import { CommentsModel } from '../../../src/models/comment.model';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { CommentStatus } from '@/graphql/generated';

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
    const id = '6628b369dfc5622cb34cedf0';
    const mockedModel = jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: id });
    const result = await setCommentStatusToNormal!({}, { id }, {}, {} as GraphQLResolveInfo);
    expect(CommentsModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { status: CommentStatus.Normal });
    expect(result).toEqual(id);
    expect(mockedModel).toHaveReturned();
  });
  it('should return error when failed to convert comment status to normal', async () => {
    jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockRejectedValueOnce(graphqlErrorHandler({ message: `cannot convert comment status to normal` }, errorTypes.INTERVAL_SERVER_ERROR));
    const id = '';
    try {
      await setCommentStatusToNormal!({}, { id }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: `cannot convert comment status to normal` }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

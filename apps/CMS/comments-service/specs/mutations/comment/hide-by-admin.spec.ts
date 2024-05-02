import { CommentsModel } from '../../../src/models/comment.model';
import { hideCommentByAdmin } from '../../../src/graphql/resolvers/mutations/comment/hide-by-admin';
import { GraphQLResolveInfo } from 'graphql';
import { errorTypes, graphqlErrorHandler } from '../../../src/graphql/resolvers/error';
jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('hide comment by admin mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockInput = {
    _id: '6628b369dfc5622cb34cedf0',
  };
  it('should find comment by id and update status return its id', async () => {
    const mockedModel = jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockResolvedValueOnce(mockInput);
    const result = await hideCommentByAdmin!({}, { hideInput: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(CommentsModel.findByIdAndUpdate).toHaveBeenCalledWith(mockInput._id, { status: 'HIDDEN' });
    expect(mockedModel).toHaveReturned();
    expect(result).toEqual(mockInput._id);
  });
  it('should return error when failed to hide', async () => {
    jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockRejectedValueOnce(graphqlErrorHandler({ message: `cannot hide comment by admin` }, errorTypes.INTERVAL_SERVER_ERROR));
    const emptyInput = {
      _id: '',
    };
    await expect(hideCommentByAdmin!({}, { hideInput: emptyInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError();
  });
});

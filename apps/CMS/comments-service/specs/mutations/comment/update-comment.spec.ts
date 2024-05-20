import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { updateComment } from '@/graphql/resolvers/mutations/comment/update-comment';
import { accessTokenAuth } from '@/middlewares/auth-token';
import { filterWords } from '@/middlewares/filter-words';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));
jest.mock('@/middlewares/auth-token', () => ({
  accessTokenAuth: jest.fn(),
}));
jest.mock('@/middlewares/filter-words', () => ({
  filterWords: jest.fn(),
}));

describe('1. should update comment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (accessTokenAuth as jest.Mock).mockImplementation(() => {});
    (filterWords as jest.Mock).mockImplementation((comment) => comment);
  });

  it('should update a comment and return its ID', async () => {
    const updateInput = {
      comment: 'updateTest comment',
      _id: '66289c97a1eb00939a3d02c7',
    };

    const filteredComment = await filterWords(updateInput.comment);
    const mockedModel = jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockResolvedValueOnce({
      _id: 'test',
    });

    await updateComment!({}, { updateInput }, {}, {} as GraphQLResolveInfo);

    expect(CommentsModel.findByIdAndUpdate).toHaveBeenCalledWith(updateInput._id, { comment: filteredComment });
    expect(mockedModel).toHaveReturned();
  });
});

describe('2. should throw error', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (CommentsModel.findByIdAndUpdate as jest.Mock).mockRejectedValueOnce(graphqlErrorHandler({ message: `cannot update comment` }, errorTypes.INTERVAL_SERVER_ERROR));
  });

  it('should throw an error if failed to update comment', async () => {
    const emptyInput = {
      comment: '',
      _id: '',
    };

    await expect(updateComment!({}, { updateInput: emptyInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError();
  });
});

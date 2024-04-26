import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { updateComment } from '@/graphql/resolvers/mutations';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('1. updateComment resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a comment and return its ID', async () => {
    const updateInput = {
      comment: 'updateTest comment',
      _id: '66289c97a1eb00939a3d02c7',
      name: 'asdf',
    };
    const mockedModel = jest.spyOn(CommentsModel, 'findByIdAndUpdate').mockResolvedValueOnce({
      _id: 'test',
    });
    await updateComment!({}, { updateInput }, {}, {} as GraphQLResolveInfo);
    expect(CommentsModel.findByIdAndUpdate).toHaveBeenCalledWith(updateInput._id, { comment: updateInput.comment, name: updateInput.name });
    expect(mockedModel).toHaveReturned();
  });
});

describe('2. updateComment resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should throw an error if failed to update comment', async () => {
    (CommentsModel.findByIdAndUpdate as jest.Mock).mockRejectedValueOnce(graphqlErrorHandler({ message: `cannot update comment` }, errorTypes.INTERVAL_SERVER_ERROR));
    const emptyInput = {
      comment: '',
      _id: '',
      name: '',
    };
    await expect(updateComment!({}, { updateInput: emptyInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError();
  });
});

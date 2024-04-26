import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { publishComment } from '@/graphql/resolvers/mutations';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    create: jest.fn(),
  },
}));

describe('1. publishComment resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new comment and return its ID', async () => {
    const createInput = {
      name: 'John Doe',
      comment: 'This is a test comment',
      email: 'john@example.com',
      entityId: 'entityId123',
      entityType: 'article',
      articleId: '661c87fd6837efa536464d24',
    };

    const mockedModel = jest.spyOn(CommentsModel, 'create').mockResolvedValueOnce({
      _id: 'test',
    });

    await publishComment!({}, { createInput }, {}, {} as GraphQLResolveInfo);

    expect(CommentsModel.create).toHaveBeenCalledWith(createInput);
    expect(mockedModel).toHaveReturned();
  });
});
describe('2. publishComment resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if comment creation fails', async () => {
    (CommentsModel.create as jest.Mock).mockRejectedValueOnce(graphqlErrorHandler({ message: `cannot create comment` }, errorTypes.INTERVAL_SERVER_ERROR));
    const emptyInput = {
      name: '',
      comment: '',
      email: '',
      entityId: '',
      entityType: '',
      articleId: '',
      createdAt: null,
      ipAddress: '',
      userAgent: '',
    };
    await expect(publishComment!({}, { createInput: emptyInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError();
  });
});

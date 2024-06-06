import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { publishComment } from '../../../src/graphql/resolvers/mutations/comment/create-comment';
import { GraphQLResolveInfo } from 'graphql';
import { CommentsModel } from '@/models/comment.model';
import { filterWords } from '@/middlewares/filter-words';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    create: jest.fn(),
  },
}));
jest.mock('@/middlewares/filter-words', () => ({
  filterWords: jest.fn(),
}));

describe('1. publishComment resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  (filterWords as jest.Mock).mockImplementation(() => {});
  it('should create a new comment and return its ID', async () => {
    const createInput = {
      name: 'John Doe',
      comment: 'This is a test comment',
      email: 'john@example.com',
      entityId: 'entityId123',
      entityType: 'article',
      articleId: '661c87fd6837efa536464d24',
    };
    const mockCreatedComment = {
      _id: 'test',
      ...createInput,
    };
    (CommentsModel.create as jest.Mock).mockResolvedValueOnce(mockCreatedComment);

    const result = await publishComment!({}, { createInput }, {}, {} as GraphQLResolveInfo);
    const filteredComment = await filterWords(createInput.comment);

    expect(CommentsModel.create).toHaveBeenCalledWith({
      comment: filteredComment,
      name: createInput.name,
      email: createInput.email,
      entityId: createInput.entityId,
      entityType: createInput.entityType,
      articleId: createInput.articleId,
    });
    expect(result).toEqual(mockCreatedComment._id);
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

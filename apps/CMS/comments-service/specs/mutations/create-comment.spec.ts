import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { publishComment } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        _id: 'test',
      })
      .mockRejectedValueOnce(null),
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

    const result = await publishComment!({}, { createInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('test');
  });
});
describe('2. publishComment resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if comment creation fails', async () => {
    const createInput = {
      name: 'ace error test',
      comment: 'This is a test comment',
      email: 'john@example.com',
      entityId: 'entityId123',
      entityType: 'article',
      articleId: '661c87fd6837efa536464d25',
      createdAt: new Date(),
      ipAddress: 'asf',
      userAgent: 'asdf',
    };
    try {
      const result = await publishComment!({}, { createInput: createInput }, {}, {} as GraphQLResolveInfo);
      expect(result).toEqual('test');
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: `cannot create comment null` }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

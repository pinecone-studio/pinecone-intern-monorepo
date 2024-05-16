import { getComments } from '@/graphql/resolvers/queries';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    find: jest.fn(),
  },
}));

describe('This query should return comments', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('should return comments if found', async () => {
    (CommentsModel.find as jest.Mock).mockReturnValueOnce({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce([{ 
        _id: 'asdf', 
        name: 'adsf', 
        email: 'asdfejf', 
        comment: 'test', 
        ipAddress: 'adf', 
        createdAt: new Date(), 
        articleId: 'asdf' 
      }]),
    });

    const input = { limit: 10, offset: 0, status: [] };
    const comments = await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(comments).toEqual([{ 
      _id: 'asdf', 
      name: 'adsf', 
      email: 'asdfejf', 
      comment: 'test', 
      ipAddress: 'adf', 
      createdAt: expect.any(Date), 
      articleId: 'asdf' 
    }]);
  });

  it('should return GraphQLError if comments not found', async () => {
    (CommentsModel.find as jest.Mock).mockReturnValueOnce({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce([]), 
    });

    const input = { limit: 10, offset: 0, status: [] };
    await expect(getComments!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
  });
});

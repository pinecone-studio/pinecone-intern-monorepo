import { getComments } from '@/graphql/resolvers/queries';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    find: jest.fn().mockReturnValueOnce({
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
    }),
    countDocuments: jest.fn().mockResolvedValueOnce(1),
  },
}));

describe('This query should return comments', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1. should return comments if found', async () => {
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

  it('2. should return GraphQLError if comments not found', async () => {
    (CommentsModel.find as jest.Mock).mockReturnValueOnce({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce([]),
    });
    const input = { limit: 10, offset: 0, status: [] };
    try {
      await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get comments query'));
    }
  });
});

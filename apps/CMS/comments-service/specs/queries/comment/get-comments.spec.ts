import { CommentStatus } from '@/graphql/generated';
import { getComments } from '@/graphql/resolvers/queries';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    find: jest.fn(),
    aggregate: jest.fn(),
  },
}));

const mockComments = [
  {
    _id: 'asdf',
    name: 'adsf',
    email: 'asdfejf',
    comment: 'test',
    ipAddress: 'adf',
    createdAt: new Date(),
    articleId: 'asdf'
  }
];

const mockAggregateResult = [
  {
    allCount: [{ count: 10 }],
    hiddenCount: [{ count: 3 }],
    normalCount: [{ count: 5 }],
    deletedCount: [{ count: 2 }],
  }
];

describe('getComments resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1.should return comments and counts when found', async () => {
   try {
     (CommentsModel.find as jest.Mock).mockResolvedValueOnce(mockComments);
     (CommentsModel.aggregate as jest.Mock).mockResolvedValueOnce(mockAggregateResult);
 
     const input = { limit: 10, offset: 0, status: [] };
     const result = await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
 
     expect(CommentsModel.find).toHaveBeenCalledWith({});
     expect(result).toEqual({
       allCount: 10,
       hiddenCount: 3,
       normalCount: 5,
       deletedCount: 2,
       comments: mockComments,
     });
   } catch (error) {
    expect(error).toEqual(new GraphQLError(`Error in get comments query`));
   }
  });

  it('2.should throw a GraphQLError if comments not found', async () => {
    (CommentsModel.find as jest.Mock).mockResolvedValueOnce([]);
    (CommentsModel.aggregate as jest.Mock).mockResolvedValueOnce(mockAggregateResult);

    const input = { limit: 10, offset: 0, status: [] as CommentStatus []};
    await expect(getComments!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
  });

  it('3.should include status in filter when it exists', async () => {
    try {
      (CommentsModel.find as jest.Mock).mockResolvedValueOnce(mockComments);
      (CommentsModel.aggregate as jest.Mock).mockResolvedValueOnce(mockAggregateResult);
  
      const input = { limit: 10, offset: 0, status: ['NORMAL', 'HIDDEN', 'DELETED'] as CommentStatus []};
      await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
  
      expect(CommentsModel.find).toHaveBeenCalledWith({ status: ['NORMAL', 'HIDDEN', 'DELETED'] });
    } catch (error) {
      expect(error).toEqual(new GraphQLError(`Error in get comments query`));
    }
  });

  it('4.should throw a GraphQLError when an error occurs', async () => {
    const input = { limit: 10, offset: 0, status: ['NORMAL', 'HIDDEN', 'DELETED'] as CommentStatus [] }; 
    await expect(getComments!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
  });
});

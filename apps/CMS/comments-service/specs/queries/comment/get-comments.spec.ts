import { CommentStatus } from '@/graphql/generated';
import { getComments } from '@/graphql/resolvers/queries';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    find: jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce([{_id: 'asdf', name: 'adsf', email: 'asdfejf', comment: 'test', ipAddress: 'adf', createdAt: new Date(), articleId: 'asdf' }]),}),
    countDocuments: jest.fn().mockResolvedValueOnce(1),
  },
}));

describe('This query should return comments', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('1. should return comments if found', async () => {
  try {
    (CommentsModel.find as jest.Mock).mockReturnValueOnce([
      { _id: 'asdf', name: 'adsf', email: 'asdfejf', comment: 'test', ipAddress: 'adf', createdAt: new Date(), articleId: 'asdf'  }
    ]);
    const input = { limit: 10, offset: 0, status: [] };
    const comments = await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(comments).toEqual({
      count: 1,
      allCount: 1,
      hiddenCount: undefined,
      normalCount: undefined,
      deletedCount: undefined,
      comments: [
        {  _id: 'asdf', name: 'adsf', email: 'asdfejf',  comment: 'test',  ipAddress: 'adf', createdAt: expect.any(Date), articleId: 'asdf'}
      ]
    });
  } catch (error) {
    expect(error).toEqual(new GraphQLError(`Error in get comments query`));
  }
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
      expect(error).toEqual(new GraphQLError(`Error in get comments query`));
    }
  });
  it('3.should include status in filter when it exists', async () => {
    try {
      const input = { limit: 10, offset: 0, status: ['NORMAL','HIDDEN','DELETED'] as CommentStatus[] };
      await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
      expect(CommentsModel.find).toHaveBeenCalledWith({ status: ['NORMAL','HIDDEN','DELETED'] });
    } catch (error) {
      expect(error).toEqual(new GraphQLError(`Error in get comments query`));
    }
  });
  it('4.should not include status in filter when it does not exist', async () => {
    try {
      const input = { limit: 10, offset: 0, status: [] as CommentStatus[] };
      await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
      expect(CommentsModel.find).toHaveBeenCalledWith({});
    } catch (error) {
      expect(error).toEqual(new GraphQLError(`Error in get comments query`));
    }
  });
});

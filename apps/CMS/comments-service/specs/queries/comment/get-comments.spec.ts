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
const mockAggregateResult = [
  {
    allCount: [{ count: 10 }],
    hiddenCount: [{ count: 3 }],
    normalCount: [{ count: 5 }],
    deletedCount: [{ count: 2 }],
  }
];

describe('This query should return comments', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1. should return comments if found', async () => {
    (CommentsModel.find as jest.Mock).mockResolvedValueOnce([{_id: 'asdf', name: 'adsf', email: 'asdfejf', comment: 'test', ipAddress: 'adf', createdAt: new Date(), articleId: 'asdf' }]);
    const input = { limit: 10, offset: 0, status: [] };
    const comments = await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(comments).toEqual({
      count: 1,
      allCount: 10,
      hiddenCount: 3,
      normalCount: 5,
      deletedCount: 2,
      comments: [{_id: 'asdf', name: 'adsf', email: 'asdfejf', comment: 'test', ipAddress: 'adf', createdAt: expect.any(Date), articleId: 'asdf' }]
    });
  });

  it('2. should return GraphQLError if comments not found', async () => {
    (CommentsModel.find as jest.Mock).mockResolvedValueOnce([]);
    const input = { limit: 10, offset: 0, status: [] };
    await expect(getComments!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError(GraphQLError);
  });

  it('3. should include status in filter when it exists', async () => {
    const input = { limit: 10, offset: 0, status: ['NORMAL', 'HIDDEN', 'DELETED'] as CommentStatus[] };
    await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(CommentsModel.find).toHaveBeenNthCalledWith(1, { status: ['NORMAL', 'HIDDEN', 'DELETED'] });
  });

  it('4. should not include status in filter when it does not exist', async () => {
    const input = { limit: 10, offset: 0, status: [] as CommentStatus[] };
    await getComments!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(CommentsModel.find).toHaveBeenNthCalledWith(1, {});
  });

  it('5. should return counts for different comment statuses', async () => {
    (CommentsModel.aggregate as jest.Mock).mockResolvedValueOnce(mockAggregateResult);
    const result = await getComments!({}, { input: { limit: 10, offset: 0, status: [] } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      allCount: 10,
      hiddenCount: 3,
      normalCount: 5,
      deletedCount: 2,
      comments: []
    });
    expect(CommentsModel.aggregate).toHaveBeenCalledWith([
      {
        $facet: {
          allCount: [{ $count: "count" }],
          hiddenCount: [{ $match: { status: 'HIDDEN' } }, { $count: "count" }],
          normalCount: [{ $match: { status: 'NORMAL' } }, { $count: "count" }],
          deletedCount: [{ $match: { status: 'DELETED' } }, { $count: "count" }]
        }
      },
      {
        $project: {
          allCount: { $arrayElemAt: ["$allCount.count", 0] },
          hiddenCount: { $arrayElemAt: ["$hiddenCount.count", 0] },
          normalCount: { $arrayElemAt: ["$normalCount.count", 0] },
          deletedCount: { $arrayElemAt: ["$deletedCount.count", 0] }
        }
      }
    ]);
  });
});

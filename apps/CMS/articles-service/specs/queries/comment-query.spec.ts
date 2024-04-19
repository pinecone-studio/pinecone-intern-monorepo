import { GraphQLResolveInfo } from 'graphql';
import { getCommentsByArticleId } from '../../src/graphql/resolvers/queries/comment-query';
import { CommentModel } from '../../src/models/comment.model';

const mockArticleId = 'mock-article-id';
const mockContext = {};
const mockParent = {};

describe('getCommentsByArticleId', () => {
  afterEach(() => {
    // Restore the original implementation of CommentModel.find
    jest.restoreAllMocks();
  });

  it('should return comments for a given articleId', async () => {
    const expectedComments = [
      {
        _id: 'comment-id-1',
        articleId: 'mock-article-id',
        userName: 'User1',
        comment: 'This is a test comment',
        createdAt: new Date(),
        ipAddress: '127.0.0.1',
      },
      {
        _id: 'comment-id-2',
        articleId: 'mock-article-id',
        userName: 'User2',
        comment: 'Another test comment',
        createdAt: new Date(),
        ipAddress: '127.0.0.1',
      },
    ];

    // Mocking CommentModel.find to return expectedComments
    CommentModel.find = jest.fn().mockResolvedValue(expectedComments);

    // Call the resolver function
    const result = await getCommentsByArticleId?.(mockParent, { articleId: mockArticleId }, mockContext, {} as GraphQLResolveInfo);

    // Assertions
    expect(result).toEqual(expectedComments);
    expect(CommentModel.find).toHaveBeenCalledWith({ articleId: mockArticleId });
  });

  it('should throw an error when there is a database error', async () => {
    // Mocking CommentModel.find to simulate a database error
    CommentModel.find = jest.fn().mockRejectedValue(new Error('Database error'));

    // Call the resolver function and expect it to throw an error
    await expect(getCommentsByArticleId?.(mockParent, { articleId: mockArticleId }, mockContext, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to fetch comments by article ID');

    // Check if CommentModel.find has been called with the correct arguments
    expect(CommentModel.find).toHaveBeenCalledWith({ articleId: mockArticleId });
  });
});

import { deleteArticle } from '@/graphql/resolvers/mutations';
import { ArticleModel } from '@/models';
import { GraphQLError } from 'graphql';

jest.mock('@/models/article.model', () => ({
  ArticleModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('deleteArticle resolver', () => {
  const id = 'article_id_here';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deletes an article successfully', async () => {
    const mockDeletedArticle = {
      _id: id,
      title: 'Deleted Article',
      content: 'Deleted Content',
    };

    (ArticleModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedArticle);

    const result = await deleteArticle(undefined, { id });

    expect(result).toEqual(mockDeletedArticle);
    expect(ArticleModel.findByIdAndDelete).toHaveBeenCalledWith(id);
  });

  it('throws an error when article is not found', async () => {
    (ArticleModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteArticle(undefined, { id })).rejects.toThrow(GraphQLError);
    await expect(deleteArticle(undefined, { id })).rejects.toThrow('Failed to delete article');

    expect(ArticleModel.findByIdAndDelete).toHaveBeenCalledWith(id);
  });

  it('throws a generic error when deletion fails', async () => {
    const errorMessage = 'Database error';
    const mockError = new Error(errorMessage);

    (ArticleModel.findByIdAndDelete as jest.Mock).mockRejectedValue(mockError);

    await expect(deleteArticle(undefined, { id })).rejects.toThrow(GraphQLError);
    await expect(deleteArticle(undefined, { id })).rejects.toThrow('Failed to delete article');

    expect(ArticleModel.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});

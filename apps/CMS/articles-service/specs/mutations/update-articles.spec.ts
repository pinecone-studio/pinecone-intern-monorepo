import { updateArticle } from '@/graphql/resolvers/mutations';
import { ArticleModel } from '@/models/articles.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/articles.model', () => ({
  ArticleModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('updateArticle resolver', () => {
  let consoleLogSpy;
  const articleInput = {
    _id: 'article_id_here',
    title: 'Updated Article',
    content: 'Updated Content',
  };

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('updates an article successfully', async () => {
    const mockUpdatedArticle = {
      _id: 'article_id_here',
      title: 'Updated Article',
      content: 'Updated Content',
    };

    (ArticleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedArticle);

    const result = await updateArticle(undefined, { input: articleInput });

    expect(result).toEqual(mockUpdatedArticle);

    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(
      articleInput._id,
      expect.objectContaining({
        title: articleInput.title,
        content: articleInput.content,
      }),
      { new: true }
    );
  });

  it('throws an error when article is not found', async () => {
    (ArticleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    try {
      await updateArticle(undefined, { input: articleInput });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);

      expect(error.message).toBe('Could not find article to update');
    }
    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(
      articleInput._id,
      expect.objectContaining({
        title: articleInput.title,
        content: articleInput.content,
      }),
      { new: true }
    );
  });

  it('logs an error when update fails', async () => {
    const errorMessage = 'Database error';
    const mockError = new Error(errorMessage);
    (ArticleModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(mockError);

    try {
      await updateArticle(undefined, { input: articleInput });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);

      expect(error.message).toBe('Failed to update article');
    }

    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(
      articleInput._id,
      expect.objectContaining({
        title: articleInput.title,
        content: articleInput.content,
      }),
      { new: true }
    );

    expect(consoleLogSpy).toHaveBeenCalledWith(mockError);
  });
});

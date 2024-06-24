import { updateArticle } from '@/graphql/resolvers/mutations';
import { ArticleModel } from '@/models/articles.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/articles.model', () => ({
  ArticleModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('updateArticle resolver', () => {
  let consoleErrorSpy;

  const articleInput = {
    _id: 'article_id_here',
    title: 'Updated Article',
    content: 'Updated Content',
  };

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
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

    // Ensure console.error was not called in this scenario
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('logs an error when update fails', async () => {
    const errorMessage = 'Could not find article to update';
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

    // Ensure console.error was called with the correct error object
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
  });

  it('throws an error for invalid input', async () => {
    const invalidInput = {
      title: 'Updated Article',
      content: 'Updated Content',
    };

    try {
      await updateArticle(undefined, { input: invalidInput });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      expect(error.message).toBe('Invalid input: Missing or invalid _id');
    }

    // Ensure findByIdAndUpdate was not called with invalid input
    expect(ArticleModel.findByIdAndUpdate).not.toHaveBeenCalled();

    // Ensure console.error was not called in this scenario
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});

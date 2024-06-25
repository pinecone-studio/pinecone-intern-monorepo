import { ArticleModel } from '@/models/articles.model';
import { createArticle } from '@/graphql/resolvers/mutations';
import { GraphQLError } from 'graphql';

jest.mock('@/models/articles.model', () => ({
  ArticleModel: {
    create: jest.fn(),
  },
}));

describe('createArticle resolver', () => {
  const articleInput = {
    title: 'New Article',
    content: 'New Content',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates an article successfully', async () => {
    const mockArticle = {
      _id: 'article_id_here',
      title: 'New Article',
      content: 'New Content',
    };

    (ArticleModel.create as jest.Mock).mockResolvedValue(mockArticle);

    const result = await createArticle(undefined, { articleInput });

    expect(result).toEqual(mockArticle);
    expect(ArticleModel.create).toHaveBeenCalledWith(articleInput);
  });

  it('throws a GraphQLError when creation fails', async () => {
    const errorMessage = 'article not found';
    const mockError = new Error(errorMessage);

    (ArticleModel.create as jest.Mock).mockRejectedValue(mockError);

    await expect(createArticle(undefined, { articleInput })).rejects.toThrow(GraphQLError);
    await expect(createArticle(undefined, { articleInput })).rejects.toThrow('Failed to create article');

    expect(ArticleModel.create).toHaveBeenCalledWith(articleInput);
  });

  it('throws a GraphQLError when newArticle is undefined', async () => {
    (ArticleModel.create as jest.Mock).mockResolvedValue(undefined);

    await expect(createArticle(undefined, { articleInput })).rejects.toThrow(GraphQLError);
    await expect(createArticle(undefined, { articleInput })).rejects.toThrow('Failed to create article');

    expect(ArticleModel.create).toHaveBeenCalledWith(articleInput);
  });
});

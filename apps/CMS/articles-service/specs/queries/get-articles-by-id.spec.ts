import { getArticles } from '@/graphql/resolvers/queries/get-articles-by-id';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models/articles.model';

jest.mock('@/models/articles.model', () => ({
  ArticleModel: {
    find: jest.fn(),
  },
}));

describe('getArticles Resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches articles successfully', async () => {
    const mockArticles = [
      { _id: '1', title: 'Article 1', content: 'Content 1' },
      { _id: '2', title: 'Article 2', content: 'Content 2' },
    ];

    ArticleModel.find.mockResolvedValue(mockArticles);

    const result = await getArticles();

    expect(result).toEqual(mockArticles);
    expect(ArticleModel.find).toHaveBeenCalledWith();
  });

  it('throws a GraphQLError when no articles are found', async () => {
    ArticleModel.find.mockResolvedValue(null);

    await expect(getArticles()).rejects.toThrow(GraphQLError);
    await expect(getArticles()).rejects.toThrow('article not found');
  });

  it('throws a GraphQLError on database error', async () => {
    const mockError = new Error('Database error');

    ArticleModel.find.mockRejectedValue(mockError);

    await expect(getArticles()).rejects.toThrow(GraphQLError);
    await expect(getArticles()).rejects.toThrow('Database error');
  });
});

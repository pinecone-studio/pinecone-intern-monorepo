import { getArticles } from '@/graphql/resolvers/queries';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models';

jest.mock('@/models/article.model', () => ({
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

  it('throws a GraphQLError on article not found', async () => {
    const mockError = new Error('article not found');

    ArticleModel.find.mockRejectedValue(mockError);

    await expect(getArticles()).rejects.toThrow(GraphQLError);
    await expect(getArticles()).rejects.toThrow('article not found');
  });
});

import { getArticles } from '@/graphql/resolvers/queries';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models/articles.model';

jest.mock('@/models/articles.model', () => ({
  ArticleModel: {
    find: jest.fn(),
  },
}));

describe('getArticles resolver', () => {
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

    expect(ArticleModel.find).toHaveBeenCalledWith();
  });

  it('throws a GraphQLError on database error', async () => {
    const mockError = new Error('Database error');

    ArticleModel.find.mockRejectedValue(mockError);

    await expect(getArticles()).rejects.toThrow(GraphQLError);

    expect(ArticleModel.find).toHaveBeenCalledWith();
  });
});

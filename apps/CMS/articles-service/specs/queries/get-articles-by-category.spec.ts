import { getArticlesByCategory } from '@/graphql/resolvers/queries';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/article.model', () => ({
  ArticleModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          limit: jest
            .fn()
            .mockResolvedValueOnce([
              {
                _id: '1',
                title: 'Title',
                coverPhoto: 'image_uri',
                content: 'article',
                author: '#id1',
                category: '#id2',
                status: 'status',
                slug: 'slug',
                createdAt: '2024-09-09',
                publishedAt: '2024-09-09',
                updatedAt: '2024-09-09',
                scheduledAt: '2024-09-09',
              },
            ])
            .mockResolvedValueOnce([
              {
                _id: '1',
                title: 'Title',
                coverPhoto: 'image_uri',
                content: 'article',
                author: '#id1',
                category: '#id2',
                status: 'status',
                slug: 'slug',
                createdAt: '2024-09-09',
                publishedAt: '2024-09-09',
                updatedAt: '2024-09-09',
                scheduledAt: '2024-09-09',
              },
            ])
            .mockResolvedValueOnce([])
            .mockRejectedValueOnce({ message: 'Error in getArticlesByCategory' }),
        }),
      }),
    }),
  },
}));

const mockData = [
  {
    _id: '1',
    title: 'Title',
    coverPhoto: 'image_uri',
    content: 'article',
    author: '#id1',
    category: '#id2',
    status: 'status',
    slug: 'slug',
    createdAt: '2024-09-09',
    publishedAt: '2024-09-09',
    updatedAt: '2024-09-09',
    scheduledAt: '2024-09-09',
  },
];
describe('This function should return article with matching category and given getAll input', () => {
  it('It should return all articles with matching categories', async () => {
    const articles = await getArticlesByCategory!({}, { categoryId: '1', quantity: 1 }, {}, {} as GraphQLResolveInfo);

    expect(articles).toEqual(mockData);
  });

  it('It should return 4 articles with matching categories', async () => {
    const articles = await getArticlesByCategory!({}, { categoryId: '1', quantity: 1 }, {}, {} as GraphQLResolveInfo);

    expect(articles).toEqual(mockData);
  });

  it('It sholud return empty array if there is no articles matching the category', async () => {
    const articles = await getArticlesByCategory!({}, { categoryId: '1', quantity: 1 }, {}, {} as GraphQLResolveInfo);

    expect(articles).toEqual([]);
  });

  it('It should return an error if there is error', async () => {
    try {
      await getArticlesByCategory!({}, { categoryId: '1', quantity: 1 }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in getArticlesByCategory'));
    }
  });
});

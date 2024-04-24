import { getArticlesByQuantity } from '@/graphql/resolvers/queries';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/article.model', () => ({
  ArticleModel: {
    find: jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest
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
describe('This function should return article with given quantity', () => {
  it('It should return articles with given quantity', async () => {
    const articles = await getArticlesByQuantity!({}, { quantity: 1 }, {}, {} as GraphQLResolveInfo);

    expect(articles).toEqual(mockData);
  });

  it('It sholud return empty array if there is no articles exist', async () => {
    const articles = await getArticlesByQuantity!({}, { quantity: 1 }, {}, {} as GraphQLResolveInfo);

    expect(articles).toEqual([]);
  });

  it('It should return an error if there is error', async () => {
    try {
      await getArticlesByQuantity!({}, { quantity: 1 }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in getArticlesByQuantity'));
    }
  });
});

import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getArticlesByPaginate } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/models/article.model', () => ({
  ArticleModel: {
    find: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            skip: jest.fn().mockResolvedValueOnce([
              {
                id: 'testId',
                title: 'Title',
                coverPhoto: 'image_uri',
                content: 'article',
                author: '#id1',
                category: '#id1',
                status: 'status',
                slug: 'slug',
                createdAt: '2024-09-09',
                publishedAt: '2024-09-09',
                updatedAt: '2024-09-09',
                scheduledAt: '2024-09-09',
              },
            ]),
          }),
        }),
      })
      .mockReturnValueOnce({
        countDocuments: jest.fn().mockResolvedValueOnce(1),
      }),
  },
}));

const mockData = {
  articles: [
    {
      id: 'testId',
      title: 'Title',
      coverPhoto: 'image_uri',
      content: 'article',
      author: '#id1',
      category: '#id1',
      status: 'status',
      slug: 'slug',
      createdAt: '2024-09-09',
      publishedAt: '2024-09-09',
      updatedAt: '2024-09-09',
      scheduledAt: '2024-09-09',
    },
  ],
  totalArticles: 1,
};
describe('This function should return article with matching filters', () => {
  it('Should return articles with limit', async () => {
    const result = await getArticlesByPaginate!({}, { paginationInput: { limit: 1, page: 1 }, filterInput: { status: 'status', searchedValue: 't' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockData);
  });
});

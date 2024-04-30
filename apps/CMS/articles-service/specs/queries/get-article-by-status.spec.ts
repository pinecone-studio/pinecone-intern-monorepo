import { ArticleStatus } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { getArticlesByStatus } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/models/article.model', () => ({
  ArticleModel: {
    find: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce([
          {
            id: 'testId',
            title: 'Title',
            coverPhoto: 'image_uri',
            content: 'article',
            author: '#id1',
            category: '#id1',
            status: 'PUBLISHED',
            slug: 'slug',
            createdAt: '2024-09-09',
            publishedAt: '2024-09-09',
            updatedAt: '2024-09-09',
            scheduledAt: '2024-09-09',
          },
        ])
        .mockResolvedValueOnce(undefined)
        .mockRejectedValueOnce(null),
    }),
  },
}));

const mockData = [
  {
    id: 'testId',
    title: 'Title',
    coverPhoto: 'image_uri',
    content: 'article',
    author: '#id1',
    category: '#id1',
    status: 'PUBLISHED',
    slug: 'slug',
    createdAt: '2024-09-09',
    publishedAt: '2024-09-09',
    updatedAt: '2024-09-09',
    scheduledAt: '2024-09-09',
  },
];
describe('This function should return articles with matching status', () => {
  it('Should return all articles with matching status', async () => {
    const articles = await getArticlesByStatus!({}, { status: ArticleStatus.Published }, {}, {} as GraphQLResolveInfo);
    expect(articles).toEqual(mockData);
  });
  it('should throw an error if the article cannot be found', async () => {
    try {
      await getArticlesByStatus!({}, { status: ArticleStatus.Published }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
  it('should throw an error when an error occurs during fetching', async () => {
    try {
      await getArticlesByStatus!({ undefined }, { status: ArticleStatus.Published }, { undefined }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

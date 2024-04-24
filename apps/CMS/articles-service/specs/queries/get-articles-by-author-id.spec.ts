import { getArticlesByAuthorId } from '@/graphql/resolvers/queries';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/article.model', () => ({
  ArticleModel: {
    find: jest.fn().mockReturnValue({
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
          .mockRejectedValueOnce({ message: 'Error in getArticlesByAuthorId' }),
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

describe('This query should return articles with matching author _id', () => {
  it('1. It should return articles with matching author id', async () => {
    const articles = await getArticlesByAuthorId!({}, { _id: '#id1' }, {}, {} as GraphQLResolveInfo);

    expect(articles).toEqual(mockData);
  });

  it('2. It should return empty array if author has no articles', async () => {
    const articles = await getArticlesByAuthorId!({}, { _id: '#id1' }, {}, {} as GraphQLResolveInfo);

    expect(articles).toEqual([]);
  });

  it('3. It should return error if there is an error', async () => {
    try {
      await getArticlesByAuthorId!({}, { _id: '#id1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in getArticlesByAuthorId'));
    }
  });
});

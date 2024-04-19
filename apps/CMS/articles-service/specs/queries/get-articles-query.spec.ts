import { getArticlesQuery } from '@/graphql/resolvers/queries';
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
          .mockRejectedValueOnce({ message: 'Error in get articles query' }),
      }),
    }),
  },
}));
describe('This query should return articles', () => {
  it('It should return articles from database', async () => {
    const articles = await getArticlesQuery!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(articles).toEqual([
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
    ]);
  });

  it('It should return empty array if articles does no exist', async () => {
    const articles = await getArticlesQuery!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(articles).toEqual([]);
  });

  it('It should return error', async () => {
    try {
      await getArticlesQuery!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get articles query'));
    }
  });
});

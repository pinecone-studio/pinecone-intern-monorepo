import { getArticlesByCategoryNoLimit } from '@/graphql/resolvers/queries';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import { ArticleModel } from '../../src/models/article.model';

jest.mock('../../src/models/article.model', () => ({
  ArticleModel: {
    find: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce([
          {
            _id: '1',
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
        ])
        .mockRejectedValueOnce({ message: 'Can not get articles by category (no limit)' }),
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
    category: '#id1',
    status: 'status',
    slug: 'slug',
    createdAt: '2024-09-09',
    publishedAt: '2024-09-09',
    updatedAt: '2024-09-09',
    scheduledAt: '2024-09-09',
  },
];
describe('This function should return article with matching category', () => {
  it('It should return all articles with matching categories', async () => {
    const articles = await getArticlesByCategoryNoLimit!({}, { categoryId: '#id1' }, {}, {} as GraphQLResolveInfo);

    expect(articles).toEqual(mockData);
  });
  it('It should return an error if there is error', async () => {
    try {
      await getArticlesByCategoryNoLimit!({}, { categoryId: '#id1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Can not get articles by category (no limit)'));
    }
  });
});

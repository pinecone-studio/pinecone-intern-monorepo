import { getArticlesQuery } from '@/graphql/resolvers/queries';

const mockData = {
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
};

jest.mock('@/models/article.model', () => ({
  ArticleModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValueOnce([mockData]).mockResolvedValueOnce([]),
      }),
    }),
  },
}));
describe('This query should return articles', () => {
  it('It should return articles from database', async () => {
    const articles = await getArticlesQuery();

    expect(articles).toEqual([mockData]);
  });

  it('It should return empty array if articles does no exist', async () => {
    const articles = await getArticlesQuery();

    expect(articles).toEqual([]);
  });
});

import { getArticlesByPaginate } from '@/graphql/resolvers/queries';
import { ArticleModel } from '@/models';
import { GraphQLResolveInfo } from 'graphql';
import jwt from 'jsonwebtoken';

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

jest.mock('../../src/middlewares/auth-token', () => ({
  accessTokenAuth: jest
    .fn()
    .mockReturnValueOnce({
      id: '1',
      name: 'string',
      email: 'string',
      role: 'user',
      iat: 1,
    })
    .mockReturnValueOnce({
      id: '1',
      name: 'string',
      email: 'string',
      role: 'admin',
      iat: 1,
    }),
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
const accessTokenUser = jwt.sign({ id: '1', name: 'string', email: 'string', role: 'user' }, 'secret-key');
const accessTokenAdmin = jwt.sign({ id: '1', name: 'string', email: 'string', role: 'admin' }, 'secret-key');
describe('This function should return article with matching filters', () => {
  it('should get articles by paginate', async () => {
    (ArticleModel.find as jest.Mock)
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
      });

    const result = await getArticlesByPaginate!(
      {},
      { paginationInput: { limit: 1, page: 1 }, filterInput: { status: 'status', searchedValue: 'title', startDate: '2024-09-08', endDate: '2024-09-15' } },
      { headers: { authorization: accessTokenUser } },
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual(mockData);
  });
  it('should delete comment by id and return its ID', async () => {
    (ArticleModel.find as jest.Mock)
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
      });

    const result = await getArticlesByPaginate!(
      {},
      { paginationInput: { limit: 1, page: 1 }, filterInput: { status: undefined, searchedValue: undefined, startDate: undefined, endDate: undefined } },
      { headers: { authorization: accessTokenAdmin } },
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual(mockData);
  });
});

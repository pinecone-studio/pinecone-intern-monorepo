import { getArticlesByRole } from '@/graphql/resolvers/queries';
import { ArticleModel } from '@/models';
import { GraphQLResolveInfo } from 'graphql';
import jwt from 'jsonwebtoken';

jest.mock('../../src/models/article.model', () => ({
  ArticleModel: {
    find: jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValue([
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
  },
}));

jest.mock('../../src/middlewares/auth-token', () => ({
  accessTokenAuth: jest
    .fn()
    .mockReturnValueOnce({
      id: '1',
      name: 'string',
      email: 'string',
      role: 'author',
      iat: 1,
    })
    .mockReturnValueOnce({
      id: '1',
      name: 'string',
      email: 'string',
      role: 'admin',
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

const mockData = [
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
];

const accessTokenUser = jwt.sign({ id: '1', name: 'string', email: 'string', role: 'author' }, 'secret-key');
const accessTokenAdmin = jwt.sign({ id: '1', name: 'string', email: 'string', role: 'admin' }, 'secret-key');
describe('This function should return article with matching filters', () => {
  it('should return articles when user is author', async () => {
    (ArticleModel.find as jest.Mock).mockReturnValueOnce({
      populate: jest.fn().mockReturnValue([
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
    });
    const result = await getArticlesByRole!({}, {}, { headers: { authorization: accessTokenUser } }, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockData);
  });
  it('should return articles when user is admin', async () => {
    (ArticleModel.find as jest.Mock).mockReturnValueOnce({
      populate: jest.fn().mockReturnValue([
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
    });
    const result = await getArticlesByRole!({}, {}, { headers: { authorization: accessTokenAdmin } }, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockData);
  });
});

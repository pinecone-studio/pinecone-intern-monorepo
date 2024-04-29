import { getNewestArticle } from '@/graphql/resolvers/queries';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/article.model', () => ({
  ArticleModel: {
    findOne: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest
            .fn()
            .mockResolvedValueOnce({
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
            })
            .mockResolvedValueOnce(null)
            .mockRejectedValueOnce({ message: 'Error in getNewestArticle' }),
        }),
      }),
    }),
  },
}));

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

describe('This query should return an article that published lately', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('1. It should return an article that published', async () => {
    const article = await getNewestArticle!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(article).toEqual(mockData);
  });

  it('2. It should return error if Article does not exist', async () => {
    try {
      await getNewestArticle!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in getNewestArticle'));
    }
  });
  it('3. It should return error if there is an error in function', async () => {
    try {
      await getNewestArticle!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in getNewestArticle'));
    }
  });
});

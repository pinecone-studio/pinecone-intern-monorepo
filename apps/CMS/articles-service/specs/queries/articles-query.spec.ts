import { GraphQLResolveInfo } from 'graphql';
import { getArticles } from '../../src/graphql/resolvers/queries/articles-query';
import { articleModel } from '../../src/models/article.model';

describe('articles', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('1. should return an array of articles', async () => {
    articleModel.find = jest.fn().mockResolvedValue(['title', 'status', 'create']);

    const result = await getArticles!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(['title', 'status', 'create']);
  });

  it('2. should handle empty array when no articles are found', async () => {
    articleModel.find = jest.fn().mockResolvedValue([]);

    const result = await getArticles!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([]);
  });
});

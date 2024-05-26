import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { deleteArticleById } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/models/article.model', () => ({
  ArticleModel: {
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({ _id: '1', title: 'test' }).mockResolvedValueOnce(null).mockRejectedValueOnce(null),
  },
}));

describe('delete article by id', () => {
  it('it should delete article', async () => {
    const result = await deleteArticleById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({ message: `Deleted` });
  });

  it('it should throw article not found error', async () => {
    try {
      await deleteArticleById!({}, { _id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Any article found' }, errorTypes.NOT_FOUND));
    }
  });

  it('it should throw error', async () => {
    try {
      await deleteArticleById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      return graphqlErrorHandler({ message: 'could not delete article' }, errorTypes.BAD_REQUEST);
    }
  });
});

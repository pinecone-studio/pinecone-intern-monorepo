import { GraphQLResolveInfo } from 'graphql';
import { updateArticle } from '../../src/graphql/resolvers/mutations/update-article';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';

jest.mock('../../src/models', () => ({
  ArticleModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockResolvedValue({
          _id: '1',
          title: 'test',
          content: 'test',
          category: 'name',
          commentPermission: true,
        }),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockResolvedValue(null),
      }),
  },
}));

describe('Update Article', () => {
  it('Should update an article', async () => {
    const result = await updateArticle!({}, { _id: '1', title: 'test', content: 'test', category: 'name', commentPermission: true }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      title: 'test',
      content: 'test',
      category: 'name',
      commentPermission: true,
    });
  });

  it("should not found error if the article doesn't exist", async () => {
    try {
      await updateArticle!({}, { _id: '', title: '', content: '', category: '', commentPermission: true }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Article not found' }, errorTypes.NOT_FOUND));
    }
  });

  it('should throw unexpected error ', async () => {
    try {
      await updateArticle!({}, { _id: '1', title: 'test', content: 'test', category: 'name', commentPermission: true }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Error updating article' }, errorTypes.BAD_REQUEST));
    }
  });
});

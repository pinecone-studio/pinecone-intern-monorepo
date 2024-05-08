import { GraphQLResolveInfo } from 'graphql';
import { updateArticle } from '../../src/graphql/resolvers/mutations/update-article';

jest.mock('../../src/models', () => ({
  ArticleModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValue({
          _id: '1',
          title: 'test',
          content: 'test',
          category: 'name',
          commentPermission: true,
        }),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce(null),
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

  it("should throw error if the article doesn't exist", async () => {
    try {
      await updateArticle!({}, { _id: '1', title: 'test', content: 'test', category: 'name', commentPermission: true }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Article not found'));
    }
  });
});

import { updateArticleStatusById } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
const mockedArticle = {
  _id: '1',
  title: 'Leap',
  coverPhoto: '',
  content: 'testing content',
  author: '1',
  category: '1',
  status: 'ARCHIVED',
  slug: 'thisisSlug',
  commentPermission: false,
};
jest.mock('../../src/models/article.model', () => ({
  ArticleModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce({
          _id: '1',
          title: 'Leap',
          coverPhoto: '',
          content: 'testing content',
          author: '1',
          category: '1',
          status: 'ARCHIVED',
          slug: 'thisisSlug',
          commentPermission: false,
        })
        .mockResolvedValueOnce(null),
    }),
  },
}));

describe('Update article status', () => {
  it('should update article status by id', async () => {
    const result = await updateArticleStatusById!({}, { _id: '1', newStatus: 'ARCHIVED' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockedArticle);
  });

  it("should throw an error if the article doesn't exist", async () => {
    try {
      await updateArticleStatusById!({}, { _id: '1', newStatus: 'ARCHIVED' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('could not update article status'));
    }
  });
});

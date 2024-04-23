import { errorTypes, graphqlErrorHandler, } from '@/graphql/resolvers/error';
import { getArticleByID } from '../../src/graphql/resolvers/queries/get-article-by-id-query';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/models/article.model', () => ({
    ArticleModel: {
        findById: jest.fn()
        .mockReturnValueOnce({
            _id: '1',
            title: "Test title",
            coverPhoto: "Image",
            content: "This is test text",
            author: "authorID",
            category: "categoryID",
            status: "ARCHIVED"
          })
          .mockResolvedValueOnce(undefined)
          .mockRejectedValueOnce(null),
    },
}));

describe('GetArticleByID', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the article when found', async () => {
        const result = await getArticleByID!({undefined}, { id: '1' }, {undefined}, {} as GraphQLResolveInfo);
        expect(result).toEqual({
            _id: '1',
            title: "Test title",
            coverPhoto: "Image",
            content: "This is test text",
            author: "authorID",
            category: "categoryID",
            status: "ARCHIVED"
        });
      });

      it('should throw an error if the article cannot be found', async () => {
        try {
          await getArticleByID!({}, { id: '2' }, {}, {} as GraphQLResolveInfo);
        } catch (error) {
          expect(error).toEqual(graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR));
        }
      });

      it("should throw an error when an error occurs during fetching", async () => {
        try {
            await getArticleByID!({undefined}, { id: '1' }, {undefined}, {} as GraphQLResolveInfo);
        } catch (error) {
            expect(error).toEqual(graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR))
        }
      })
  });
import { errorTypes, graphqlErrorHandler, } from '@/graphql/resolvers/error';
import { getArticleByID } from '../../src/graphql/resolvers/queries/get-by-id';
import { GraphQLResolveInfo } from 'graphql';
import {  } from "../../src/models/article.model";

jest.mock('../../src/models/article.model', () => ({
    articleModel: {
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
          .mockRejectedValueOnce(null),
    },
}));

describe('GetArticleByID', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the article when found', async () => {
        const result = await getArticleByID!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
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
    
      it("should throw an error when an error occurs during fetching", async () => {
        try {
            await getArticleByID!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
        } catch (error) {
            expect(error).toEqual(graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR))
        }
      })
  });
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import { getReactionsByArticleId } from '../../../articles-service/src/graphql/resolvers/queries/get-reactions-query';

jest.mock('../../../articles-service/src/models/reaction.model', () => ({
  reactionModel: {
    find: jest.fn().mockImplementation((query) => {
      if (query.articleId === '661c87fd6837efa536464d26') {
        return {
          populate: jest.fn().mockReturnValueOnce([
            {
              emoji: 'like',
              count: 2,
              users: [{ name: 'Sokka' }, { name: 'Aang' }],
              articleId: { title: 'on sagging cheeks' },
              category: { name: 'dab rouge' },
            },
          ]),
        };
      } else {
        throw new Error('Failed to get reactions for specific article');
      }
    }),
  },
}));
const articleId = '661c87fd6837efa536464d26';
describe('fetching reactions for specific article', () => {
  it('1. should fetch data using fetch query', async () => {
    const result = await getReactionsByArticleId!({}, { articleId }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        emoji: 'like',
        count: 2,
        users: [{ name: 'Sokka' }, { name: 'Aang' }],
        articleId: { title: 'on sagging cheeks' },
        category: { name: 'dab rouge' },
      },
    ]);
  });

  it('2. throw an error message if there is not promising query', async () => {
    try {
      await getReactionsByArticleId!({}, { articleId: 'a' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Failed to get reactions for specific article'));
    }
  });
});

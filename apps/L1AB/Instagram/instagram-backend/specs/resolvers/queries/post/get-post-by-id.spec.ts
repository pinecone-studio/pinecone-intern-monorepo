import { getPostById } from 'apps/L1AB/Instagram/instagram-backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  postsModel: {
    findById: jest.fn().mockResolvedValueOnce({ name: 'test' }).mockReturnValueOnce(null),
  },
}));

describe('getPostById', () => {
  it('it should return successfully', async () => {
    const res = await getPostById!({}, { postId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual({ name: 'test' });
  });

  it('it should throw a error', async () => {
    try {
      await getPostById!({}, { postId: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Post not found'));
    }
  });
});

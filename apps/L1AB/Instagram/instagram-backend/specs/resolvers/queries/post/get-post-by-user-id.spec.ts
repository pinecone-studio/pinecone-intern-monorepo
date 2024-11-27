import { getPostByUserId } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  postsModel: {
    find: jest.fn().mockResolvedValueOnce({ name: 'test' }).mockReturnValueOnce(null),
  },
}));

describe('getPostByUserId', () => {
  it('it should return successfully', async () => {
    const res = await getPostByUserId!({}, { userId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual({ name: 'test' });
  });

  it('it should throw a error', async () => {
    try {
      await getPostByUserId!({}, { userId: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Post not found'));
    }
  });
});

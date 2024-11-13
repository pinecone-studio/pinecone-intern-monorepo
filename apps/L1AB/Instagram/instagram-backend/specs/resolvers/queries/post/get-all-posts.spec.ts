import { GraphQLResolveInfo } from 'graphql';
import { getAllPosts } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  postsModel: {
    find: jest.fn().mockResolvedValueOnce(['test']),
  },
}));

describe('getAllPosts', () => {
  it('should get all posts', async () => {
    const res = await getAllPosts!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual(['test']);
  });
});

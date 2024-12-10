import { getLikesByPostId } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  likesModel: {
    find: jest.fn().mockResolvedValueOnce({ test: 'id' }),
  },
}));

describe('getLikeByPostId', () => {
  it('it should retun', async () => {
    const res = await getLikesByPostId!({}, { postId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual({ test: 'id' });
  });
});

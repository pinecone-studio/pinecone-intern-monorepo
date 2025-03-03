import { GraphQLResolveInfo } from 'graphql';
import { getPosts } from '../../../../src/resolvers/queries/post/get-posts';

jest.mock('apps/L1FG/real-state/backend/src/models/post-model', () => ({
  Post: {
    find: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockResolvedValueOnce([
          {
            _id: '67729b7868800928a433e430',
            propertyOwnerId: '67729b7868800928a433e430',
            title: 'test',
            price: 30000,
            propertyDetail: '67729b7868800928a433e430',
            status: 'DECLINED',
            updatedAt: '2025-02-05T06:48:00.000Z',
            createdAt: '2025-02-05T06:48:00.000Z',
          },
        ]),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockResolvedValueOnce(null),
      }),
  },
}));
describe('getPostById', () => {
  const context = {
    userId: '67729b7868800928a433e430',
  };
  it('should get posts ', async () => {
    const res = await getPosts!({}, {}, context, {} as GraphQLResolveInfo);

    expect(res).toEqual([
      {
        _id: '67729b7868800928a433e430',
        propertyOwnerId: '67729b7868800928a433e430',
        title: 'test',
        price: 30000,
        propertyDetail: '67729b7868800928a433e430',
        status: 'DECLINED',
        updatedAt: '2025-02-05T06:48:00.000Z',
        createdAt: '2025-02-05T06:48:00.000Z',
      },
    ]);
  });

  it('should throw an error when no post is found', async () => {
    try {
      await getPosts!({}, {}, context, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('There are no posts'));
    }
  });
});

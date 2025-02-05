import { GraphQLResolveInfo } from 'graphql';
import { getPosts } from 'apps/L1FG/real-state/backend/src/resolvers/queries/post/get-posts';
import { Post } from 'apps/L1FG/real-state/backend/src/models/post-model';

jest.mock('apps/L1FG/real-state/backend/src/models/post-model', () => ({
  Post: {
    find: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '67729b7868800928a433e430',
        propertyOwnerId: '67729b7868800928a433e430',
        title: 'test',
        price: 30000,
        propertyDetail: '67729b7868800928a433e430',
        status: 'DECLINED',
        updatedAt: new Date('2024-09-01').toISOString(),
        createdAt: new Date('2024-09-01').toISOString(),
      })
      .mockResolvedValueOnce(null),
  },
}));

describe('getPostById', () => {
  const context = {
    userId: '67729b7868800928a433e430',
  };
  it('should get posts ', async () => {
    const res = await getPosts!({}, {}, context, {} as GraphQLResolveInfo);

    expect(Post.find);
    expect(res).toEqual({
      _id: '67729b7868800928a433e430',
      propertyOwnerId: '67729b7868800928a433e430',
      title: 'test',
      price: 30000,
      propertyDetail: '67729b7868800928a433e430',
      status: 'DECLINED',
      updatedAt: new Date('2024-09-01').toISOString(),
      createdAt: new Date('2024-09-01').toISOString(),
    });
  });

  it('should throw an error when no post is found', async () => {
    try {
      await getPosts!({}, {}, context, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('There are no posts'));
    }
  });
});

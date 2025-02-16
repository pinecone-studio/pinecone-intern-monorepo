import { deletePost } from '../../../../src/resolvers/mutations/post/delete-post';
import { GraphQLResolveInfo } from 'graphql';

// Remove the separate mockPost declaration here and define it in the mock itself
jest.mock('../../../../src/models/post-model', () => {
  const localMockPost = {
    _id: '67729b7868800928a433e430',
    propertyOwnerId: '67729b7868800928a433e430',
    title: 'test',
    price: 30000,
    propertyDetail: '67729b7868800928a433e430',
    status: 'PENDING',
    updatedAt: '2025-02-05T06:48:00.000Z',
    createdAt: '2025-02-05T06:48:00.000Z',
  };

  return {
    Post: {
      findByIdAndDelete: jest.fn().mockResolvedValueOnce(localMockPost).mockResolvedValueOnce(null),
    },
  };
});

describe('deletePost', () => {
  const context = {} as any;

  it('should delete a post successfully', async () => {
    const res = await deletePost({}, { _id: '67729b7868800928a433e430' }, context, {} as GraphQLResolveInfo);

    expect(res).toEqual({
      _id: '67729b7868800928a433e430',
      propertyOwnerId: '67729b7868800928a433e430',
      title: 'test',
      price: 30000,
      propertyDetail: '67729b7868800928a433e430',
      status: 'PENDING',
      updatedAt: '2025-02-05T06:48:00.000Z',
      createdAt: '2025-02-05T06:48:00.000Z',
    });
  });

  it('should throw an error when post is not found', async () => {
    await expect(deletePost({}, { _id: 'nonexistent-id' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('Post not found');
  });
});

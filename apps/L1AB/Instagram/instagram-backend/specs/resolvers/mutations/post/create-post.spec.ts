import { GraphQLResolveInfo } from 'graphql';
import { createPost } from '../../../../src/resolvers/mutations';

const mock = { _id: '1', userId: '1', images: ['images'], caption: 'hi', createdAt: new Date(), updatedAt: new Date() };

jest.mock('../../../../src/models', () => ({
  postsModel: {
    create: jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValueOnce({
        _id: '6763f8a1d07a1ded476c85f9',
        userId: {
          username: 'zorg',
        },
        images: ['/zurag'],
        caption: 'hello',
        createdAt: '2024-12-19T10:42:41.937Z',
        updatedAt: '2024-12-19T10:42:41.937Z',
      }),
    }),
  },
}));

describe('Create post', () => {
  it('should create post', async () => {
    await createPost!({}, { input: mock }, {}, {} as GraphQLResolveInfo);
  });
});

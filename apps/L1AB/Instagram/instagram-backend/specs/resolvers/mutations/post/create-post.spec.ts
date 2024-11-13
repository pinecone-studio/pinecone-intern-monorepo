import { GraphQLResolveInfo } from 'graphql';
import { createPost } from '../../../../src/resolvers/mutations';

const mock = { _id: '1', userId: '1', images: ['images'], caption: 'hi', likeCounts: 1, createdAt: new Date(), updatedAt: new Date() };

jest.mock('../../../../src/models', () => ({
  postsModel: {
    create: jest.fn().mockResolvedValue({ toObject: () => mock }),
  },
}));

describe('Create post', () => {
  it('should create post', async () => {
    await createPost!({}, { input: mock }, {}, {} as GraphQLResolveInfo);
  });
});

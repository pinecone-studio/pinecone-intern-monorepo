import { GraphQLResolveInfo } from 'graphql';
import { getAllSavedPosts } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  savedModel: {
    find: jest
      .fn()
      .mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue([
            {
              _id: '674fde8f8914a6bb5c07beee',
              userId: {
                _id: '1',
                username: 'odno',
              },
              postId: {
                caption: 'Hello',
              },
              createdAt: '2024-12-04T04:46:07.752Z',
            },
            {
              _id: '675003bbd41da5089869cc38',
              userId: {
                _id: '1',
                username: 'odno',
              },
              postId: {
                caption: 'hi',
              },
              createdAt: '2024-12-04T07:24:43.339Z',
            },
          ]),
        }),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          populate: jest.fn().mockReturnValueOnce([]),
        }),
      }),
  },
}));
describe('getAllSavedPosts', () => {
  it('should throw error', async () => {
    try {
      await getAllSavedPosts!({}, { userId: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('There is no saved post found'));
    }
  });
  it('should get all saved posts', async () => {
    const res = await getAllSavedPosts!({}, { userId: '1' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual([
      {
        _id: '674fde8f8914a6bb5c07beee',
        userId: {
          _id: '1',
          username: 'odno',
        },
        postId: {
          caption: 'Hello',
        },
        createdAt: '2024-12-04T04:46:07.752Z',
      },
      {
        _id: '675003bbd41da5089869cc38',
        userId: {
          _id: '1',
          username: 'odno',
        },
        postId: {
          caption: 'hi',
        },
        createdAt: '2024-12-04T07:24:43.339Z',
      },
    ]);
  });
});

import { createLike } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  likesModel: {
    findOne: jest
      .fn()
      .mockResolvedValue({
        _id: '11',
        userId: '1',
        postId: '2',
        createdAt: 'Date',
      })
      .mockReturnValueOnce(null)
      .mockReturnValueOnce({
        populate: jest.fn().mockResolvedValue({
          _id: '11',
          userId: '1',
          postId: { _id: '2', userId: '11' },
          createdAt: 'Date',
        }),
      }),
    deleteOne: jest.fn().mockResolvedValueOnce({ id: '1' }),
    create: jest.fn().mockResolvedValueOnce({
      _id: '11',
      userId: '1',
      postId: '2',
      createdAt: 'Date',
    }),
  },
  notificationsModel: {
    create: jest.fn().mockResolvedValue({ userId: '1', postId: '2', notifiedUserId: '11' }),
  },
}));

describe('create like', () => {
  it('it should delete like', async () => {
    const res = await createLike!({}, { userId: '1', postId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual({
      _id: '11',
      userId: '1',
      postId: '2',
      createdAt: 'Date',
    });
  });
  it('it should create like', async () => {
    const res = await createLike!({}, { userId: '1', postId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual({
      _id: '11',
      userId: '1',
      postId: '2',
      createdAt: 'Date',
    });
  });
});

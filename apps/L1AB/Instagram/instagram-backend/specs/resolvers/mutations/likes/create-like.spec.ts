import { createLike } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  likesModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '11',
        userId: '1',
        postId: '2',
        createdAt: 'Date',
      })
      .mockReturnValueOnce(null),
    deleteOne: jest.fn().mockResolvedValueOnce({ id: '1' }),
    create: jest.fn().mockResolvedValueOnce({
      _id: '11',
      userId: '1',
      postId: '2',
      createdAt: 'Date',
    }),
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

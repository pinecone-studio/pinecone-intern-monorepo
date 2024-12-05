import { GraphQLResolveInfo } from 'graphql';
import { getSavedByPostId } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  savedModel: {
    findOne: jest
      .fn()
      .mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue({
            _id: '1',
            userId: {
              _id: '2',
              username: 'zorg',
            },
            postId: {
              _id: '1',
              caption: 'caption',
            },
            createdAt: 'date',
          }),
        }),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValueOnce(undefined),
        }),
      }),
  },
}));
describe('getSavedByPostId', () => {
  it('it throw an error', async () => {
    try {
      await getSavedByPostId!({}, { postId: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('No saved posts found for this user'));
    }
  });

  it('should get saved by postId', async () => {
    const res = await getSavedByPostId!({}, { postId: '3' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({
      _id: '1',
      userId: {
        _id: '2',
        username: 'zorg',
      },
      postId: {
        _id: '1',
        caption: 'caption',
      },
      createdAt: 'date',
    });
  });
});

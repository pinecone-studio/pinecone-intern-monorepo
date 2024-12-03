import { GraphQLResolveInfo } from 'graphql';
import { getSavedByPostId } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  savedModel: {
    find: jest.fn().mockResolvedValue({ _id: '1', userId: '2', postId: '3', createdAt: 'date' }).mockReturnValueOnce(undefined),
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

    expect(res).toEqual({ _id: '1', userId: '2', postId: '3', createdAt: 'date' });
  });
});

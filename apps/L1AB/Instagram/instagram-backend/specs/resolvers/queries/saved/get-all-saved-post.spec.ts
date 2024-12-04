import { GraphQLResolveInfo } from 'graphql';
import { getAllSavedPosts } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  savedModel: {
    find: jest.fn().mockResolvedValueOnce([]).mockResolvedValueOnce([{}]),
  },
}));
describe('getAllSavedPosts', () => {
  it('should throw error', async () => {
    try {
      await getAllSavedPosts!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('There is no saved post'));
    }
  });
  it('should get all saved posts', async () => {
    const res = await getAllSavedPosts!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual([{}]);
  });
});

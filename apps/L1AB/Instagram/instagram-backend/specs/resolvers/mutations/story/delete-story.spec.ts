import { deleteStory } from 'apps/L1AB/Instagram/instagram-backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  storyModel: {
    findOne: jest.fn().mockReturnValueOnce({ _id: '1', userId: '2' }).mockReturnValue(null),
    findByIdAndDelete: jest.fn().mockReturnValueOnce('Success').mockReturnValue(null),
  },
}));

describe('Delete story', () => {
  const input = { _id: '1', userId: '2' };
  it('Should delete story', async () => {
    const result = await deleteStory!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toBe('Success');
  });

  it('Should not delete story', async () => {
    try {
      await deleteStory!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Story not found or does not belong to the user'));
    }
  });
});

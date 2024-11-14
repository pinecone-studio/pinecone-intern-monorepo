import { createStory } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

const input = { userId: '1', image: 'image' };

jest.mock('../../../../src/models', () => ({
  storyModel: {
    create: jest.fn().mockResolvedValue({ id: '1' }),
  },
}));

describe('Create story', () => {
  it('should create story', async () => {
    const result = await createStory!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({ id: '1' });
  });
});

import { createStory } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  StoryModel: {
    create: jest.fn().mockReturnValue({
      _id: '677fc2668598bfd1b013107f',
      userId: '677fc2668598bfd1b013107f',
      storyImage: 'http://example-image.com',
    }),
  },
  StoryNodeModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({ userId: '677fc2668598bfd1b013107f', stories: [], latestAt: '677fc2668598bfd1b013107f' }),
    create: jest.fn().mockReturnValue({
      stories: ['677fc2668598bfd1b013107f'],
      userId: '677fc2668598bfd1b013107f',
      latestAt: '677fc2668598bfd1b013107f',
    }),
    findOneAndUpdate: jest.fn().mockReturnValue({
      stories: ['677fc2668598bfd1b013107f', '677fc2668598bfd1b013107f'],
      userId: '677fc2668598bfd1b013107f',
      latestAt: '677fc2668598bfd1b013107f',
    }),
  },
}));

describe('create story', () => {
  it('should be a story', async () => {
    const input = {
      _id: '677fc2668598bfd1b013107f',
      storyImage: 'http://example-image.com',
    };

    await createStory!(
      {},
      { input },
      {
        userId: '677fc2668598bfd1b013107f',
      },
      {} as GraphQLResolveInfo
    );
  });

  it('should be a story', async () => {
    const input = {
      _id: '677fc2668598bfd1b013107f',
      storyImage: 'http://example-image.com',
    };
    await createStory!({}, { input }, { userId: '677fc2668598bfd1b013107f' }, {} as GraphQLResolveInfo);
  });
  it('Should throw an authorization error', async () => {
    const input = {
      _id: '677fc2668598bfd1b013107f',
      storyImage: 'http://example-image.com',
    };
    await expect(createStory!({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});

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
}));
describe('create story', () => {
  it('Should  create a story', async () => {
    if (!createStory) {
      return;
    }
    const input = {
      storyImage: 'http://example-image.com',
    };

    await createStory(
      {},
      { input },
      {
        userId: '677fc2668598bfd1b013107f',
      },
      {} as GraphQLResolveInfo
    );
  });
  it('Should throw an authorization error', async () => {
    if (!createStory) {
      return;
    }
    const input = {
      _id: '677fc2668598bfd1b013107f',
      storyImage: 'http://example-image.com',
    };
    await expect(createStory({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});

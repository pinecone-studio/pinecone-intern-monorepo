import { createStoryView } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  StoryViewModel: {
    create: jest.fn().mockReturnValue({
      _id: '677fc2668598bfd1b013107f',
      userId: '677fc2668598bfd1b013107f',
      storyNodeId: '677fc2668598bfd1b013107f',
      latestStory: '677fc2668598bfd1b013107f',
      seen: '677fc2668598bfd1b013107f',
    }),
  },
}));

describe('create storyView', () => {
  it('shoud be a view', async () => {
    const input = {
      _id: '677fc2668598bfd1b013107f',
      userId: '677fc2668598bfd1b013107f',
      storyNodeId: '677fc2668598bfd1b013107f',
      latestStory: '677fc2668598bfd1b013107f',
      seen: '677fc2668598bfd1b013107f',
    };

    if (!createStoryView) return;

    const result = await createStoryView({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '677fc2668598bfd1b013107f',
      userId: '677fc2668598bfd1b013107f',
      storyNodeId: '677fc2668598bfd1b013107f',
      latestStory: '677fc2668598bfd1b013107f',
      seen: '677fc2668598bfd1b013107f',
    });
  });
});

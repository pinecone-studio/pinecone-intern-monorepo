import { updateStoryView } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  StoryViewModel: {
    findOneAndUpdate: jest.fn().mockReturnValue({
      _id: '677fc2668598bfd1b013107f',
      userId: '677fc2668598bfd1b013107f',
      storyNodeId: '677fc2668598bfd1b013107f',
      latestStory: '677fc2668598bfd1b013107f',
      seen: '677fc2668598bfd1b013107f',
    }),
  },
}));
describe('create storyView', () => {
  it('Should throw an unauthorized error ', async () => {
    if (!updateStoryView) {
      return;
    }
    const input = {
      ownerId: 'qwe',
      seen: '677fc2668598bfd1b013107f',
    };
    await expect(updateStoryView({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
  it('shoud be a view', async () => {
    if (!updateStoryView) {
      return;
    }
    const input = {
      ownerId: 'qwe',
      seen: '677fc2668598bfd1b013107f',
    };
    const result = await updateStoryView({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '677fc2668598bfd1b013107f',
      userId: '677fc2668598bfd1b013107f',
      storyNodeId: '677fc2668598bfd1b013107f',
      latestStory: '677fc2668598bfd1b013107f',
      seen: '677fc2668598bfd1b013107f',
    });
  });
});

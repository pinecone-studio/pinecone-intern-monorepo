import { createStory } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  StoryModel: {
    create: jest.fn().mockReturnValue({
      input: {
        storyImage: '',
        userId: '',
      },
    }),
  },
}));

describe('create story', () => {
  it('should be a story', async () => {
    const input = {
      storyImage: '',
      userId: '',
    };

    const result = await createStory!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      input: {
        storyImage: '',
        userId: '',
      },
    });
  });
});

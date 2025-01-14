import { createStoryLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  StoryLikeModal: {
    create: jest.fn().mockReturnValue({
      userId: '',
      storyId: '',
    }),
  },
}));

describe('create comment', () => {
  it('shoud be a comment', async () => {
    const input = {
      userId: '',
      storyId: '',
    };

    const result = await createStoryLike!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(input);
  });
});

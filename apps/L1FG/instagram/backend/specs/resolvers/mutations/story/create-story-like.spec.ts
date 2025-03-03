import { createStoryLike } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  StoryLikeModal: {
    create: jest.fn().mockReturnValue({
      userId: '123',
      storyId: '134',
    }),
  },
}));
//true false  truthy falsy
describe('create comment', () => {
  it('shoud be a comment', async () => {
    if (!createStoryLike) {
      return;
    }
    const input = {
      userId: '123',
      storyId: '134',
    };
    const result = await createStoryLike({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo);
    expect(result).toEqual(input);
  });
  it('Should throw an authorization error', async () => {
    if (!createStoryLike) {
      return;
    }
    const input = {
      userId: '123',
      storyId: '134',
    };
    await expect(createStoryLike({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});

import { getAllStories } from '../../../../src/resolvers/queries/story/get-all-stories';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  storyModel: {
    find: jest.fn().mockResolvedValueOnce(['test']),
  },
}));

describe('get all stories', () => {
  it('should get all stories', async () => {
    const res = await getAllStories!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual(['test']);
  });
});

import { getAllStories } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  storyModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([
        {
          toObject: () => ['a'],
        },
      ]),
    }),
  },
}));

describe('getAllStories resolver', () => {
  it('should get all stories', async () => {
    const res = await getAllStories!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual(['a']);
  });
});

import { getAllStories } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  storyModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([
        {
          userId: {
            _id: '1',
          },
        },
        {
          userId: {
            _id: '2',
          },
        },
        {
          userId: {
            _id: '2',
          },
        },
      ]),
    }),
  },
}));

describe('getAllStories resolver', () => {
  it('should get all stories', async () => {
    const res = await getAllStories!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual([
      [
        {
          userId: {
            _id: '1',
          },
        },
      ],
      [
        {
          userId: {
            _id: '2',
          },
        },
        {
          userId: {
            _id: '2',
          },
        },
      ],
    ]);
  });
});

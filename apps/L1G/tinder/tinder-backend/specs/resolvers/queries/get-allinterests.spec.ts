import { GraphQLResolveInfo } from 'graphql';
import { getAllInterests } from 'src/resolvers/queries';

jest.mock('src/models/interests.model', () => ({
  InterestsModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
        interestName: 'test interest 1',
      },
      {
        _id: '2',

        interestName: 'test interest 2',
      },
    ]),
  },
}));
describe('Get All Interests', () => {
  it('should return all interests', async () => {
    const result = await getAllInterests!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([
      {
        _id: '1',
        interestName: 'test interest 1',
      },
      {
        _id: '2',
        interestName: 'test interest 2',
      },
    ]);
  });
});

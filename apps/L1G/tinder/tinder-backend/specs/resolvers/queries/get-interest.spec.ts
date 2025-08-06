import { GraphQLResolveInfo } from 'graphql';
import { getInterest } from 'src/resolvers/queries';

jest.mock('src/models/interests.model', () => ({
  InterestsModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        interestName: 'test interest',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('Get Interest', () => {
  it('should return a interest by id', async () => {
    const result = await getInterest!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result._id).toBe('1');
    expect(result.interestName).toBe('test interest');
  });

  it('should throw an error if the interest does not exist', async () => {
    try {
      await getInterest!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Interest not found'));
    }
  });
});

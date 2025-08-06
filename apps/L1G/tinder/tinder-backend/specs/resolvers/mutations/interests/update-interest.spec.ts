import { GraphQLResolveInfo } from 'graphql';
import { updateInterest } from 'src/resolvers/mutations';

jest.mock('src/models/interests.model', () => ({
  InterestsModel: {
    findByIdAndUpdate: jest.fn().mockReturnValueOnce({
      _id: '1',
      interestName: 'updated interest',
    }),
  },
}));

describe(' Update Interest', () => {
  it('should update an interest', async () => {
    const result = await updateInterest!({}, { _id: '1', interestName: 'updated interest' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      interestName: 'updated interest',
    });
  });
  it('should throw an error if the interest does not exist', async () => {
    try {
      await updateInterest!({}, { _id: '1', interestName: 'updated interest' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Interest not found'));
    }
  });
});

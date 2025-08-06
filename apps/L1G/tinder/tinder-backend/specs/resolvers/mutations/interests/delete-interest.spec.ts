import { GraphQLResolveInfo } from 'graphql';
import { deleteInterest } from 'src/resolvers/mutations';

jest.mock('src/models/interests.model', () => ({
  InterestsModel: {
    findByIdAndDelete: jest.fn().mockReturnValueOnce({
      _id: '1',
      interestName: 'test interest',
    }),
  },
}));

describe('Delete Interest', () => {
  it('should delete an interest', async () => {
    const result = await deleteInterest!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      interestName: 'test interest',
    });
  });

  it('should throw an error if the interest does not exist', async () => {
    try {
      await deleteInterest!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Interest not found'));
    }
  });
});

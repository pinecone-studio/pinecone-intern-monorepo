import { GraphQLResolveInfo } from 'graphql';
import { createInterest } from 'src/resolvers/mutations';

jest.mock('src/models/interests.model', () => ({
  InterestsModel: {
    create: jest.fn().mockReturnValue({
      id: '1',
      interestName: 'test interest',
    }),
  },
}));

describe('Create Interest', () => {
  it('should create an interest', async () => {
    const result = await createInterest!({}, { interestName: 'test interest' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      id: '1',
      interestName: 'test interest',
    });
  });
});

import { deleteChallengeById } from '../../src/graphql/resolvers/mutations';
import { GraphQLError } from 'graphql';
import { GraphQLResolveInfo } from 'graphql';
const challengeId = {
  _id: 'testId',
};

jest.mock('@/model/challenge.model', () => ({
  ChallengeModel: {
    findByIdAndDelete: jest
      .fn()
      .mockResolvedValueOnce({
        _id: 'testId',
      })
      .mockRejectedValueOnce(null),
  },
}));

describe('delete challenge', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('1. should delete a challenge by id', async () => {
    const result = await deleteChallengeById!({}, { challengeId }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('testId');
  });

  it('2. should throw error if cannot delete challenge', async () => {
    try {
      await deleteChallengeById!({}, { challengeId }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not delete challenge'));
    }
  });
});

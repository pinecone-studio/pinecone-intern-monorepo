import { publishChallengeById } from '../../src/graphql/resolvers/mutations';
import { GraphQLError } from 'graphql';
import { GraphQLResolveInfo } from 'graphql';
const challengeId = {
  _id: 'testId',
  status: 'DRAFT',
};

jest.mock('@/model/challenge.model', () => ({
  ChallengeModel: {
    findOneAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: 'testId',
      })
      .mockRejectedValueOnce(null),
  },
}));

describe('publish challenge', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('1. should publish a challenge by id', async () => {
    const result = await publishChallengeById!({}, { challengeId }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('testId');
  });

  it('2. should throw error if cannot publish challenge', async () => {
    try {
      await publishChallengeById!({}, { challengeId }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not publish challenge'));
    }
  });
});

import { ChallengeModel } from '@/model/challenge.model';
import { updateChallenge } from '../../src/graphql/resolvers/mutations';
import { GraphQLError } from 'graphql';
import { GraphQLResolveInfo } from 'graphql';
const challengeId = {
  _id: 'testId',
};
const updateChallengeInput = {
  title: 'CSS flex ',
};
jest.mock('@/model/challenge.model', () => ({
  ChallengeModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        title: 'CSS flex ',
      })
      .mockRejectedValueOnce(null),
  },
}));

describe('update challenge', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('1. should update a challenge by id', async () => {
    const result = await updateChallenge!({}, { challengeId, updateChallengeInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(updateChallengeInput);
  });

  it('2. should throw error if cannot update challenge', async () => {
    try {
      await updateChallenge!({}, { challengeId, updateChallengeInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not update challenge'));
    }
  });
});

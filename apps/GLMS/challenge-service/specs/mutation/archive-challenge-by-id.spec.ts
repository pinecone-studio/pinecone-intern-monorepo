import { archiveChallengeById } from '@/graphql/resolvers/mutations/archive-challenge-by-id';
import { errorTypes, graphqlErrorHandler } from '../../src/graphql/resolvers/error';
import { GraphQLResolveInfo } from 'graphql';

const challengeId = '662f3d6cad935e41aded1e13';
const archiveQuizMockData = {
  _id: '662f3d6cad935e41aded1e13',
  title: 'This is mock quiz',
  author: 'Tester',
  refCourse: '12345',
  status: 'DRAFT',
  quiz: [],
};

jest.mock('@/model/challenge.model', () => ({
  ChallengeModel: {
    findByIdAndUpdate: jest.fn().mockResolvedValueOnce(archiveQuizMockData).mockRejectedValueOnce(null),
  },
}));

describe('Update Quiz', () => {
  it('1. should archive challenge', async () => {
    const result = await archiveChallengeById!({}, { challengeId }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(challengeId);
  });

  it('2. should throw error if cannot update quiz', async () => {
    try {
      await archiveChallengeById!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Error in archive challenge by id query' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

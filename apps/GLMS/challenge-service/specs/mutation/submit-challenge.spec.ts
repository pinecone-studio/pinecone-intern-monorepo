import { submitChallenge } from '@/graphql/resolvers/mutations/submit-challenge';
import { ChallengeSessionModel } from '@/model/challenge-session.model';
import { errorTypes, graphqlErrorHandler } from '../../src/graphql/resolvers/error';
import { GraphQLError } from 'graphql';

jest.mock('@/model/challenge-session.model');
jest.mock('../../src/graphql/resolvers/error', () => ({
  errorTypes: {
    INTERVAL_SERVER_ERROR: { errorCode: 'INTERNAL_SERVER_ERROR', errorStatus: 500 },
  },
  graphqlErrorHandler: jest.fn(),
}));

describe('submitChallenge', () => {
  const mockChallengeSessionInput = {
    _id: 'mockId',
    studentEmail: 'test@gmail.com',
    challengeId: '678g67gh67',
    experiencePoint: 70,
    startedAt: '2024-05-20T11:00:00.000+00:00',
    endAt: '2024-05-20T11:10:00.000+00:00',
  };

  it('should submit a challenge', async () => {
    const mockCreatedChallengeSession = { _id: 'mockId' };
    (ChallengeSessionModel.create as jest.Mock).mockResolvedValue(mockCreatedChallengeSession);

    const result = await submitChallenge({}, { challengeSessionInput: mockChallengeSessionInput });

    expect(result).toBe(mockCreatedChallengeSession._id);
    expect(ChallengeSessionModel.create).toHaveBeenCalledWith(mockChallengeSessionInput);
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('create error');
    (ChallengeSessionModel.create as jest.Mock).mockRejectedValue(mockError);

    (graphqlErrorHandler as jest.Mock).mockImplementation(() => {
      throw new GraphQLError('cannot submit challenge', {
        extensions: {
          code: errorTypes.INTERVAL_SERVER_ERROR.errorCode,
          http: { status: errorTypes.INTERVAL_SERVER_ERROR.errorStatus },
        },
      });
    });

    await expect(submitChallenge({}, { challengeSessionInput: mockChallengeSessionInput })).rejects.toThrow('cannot submit challenge');

    expect(graphqlErrorHandler).toHaveBeenCalledWith({ message: 'cannot submit challenge' }, errorTypes.INTERVAL_SERVER_ERROR);
  });
});

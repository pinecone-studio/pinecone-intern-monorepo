import { getChallengeSessions } from '@/graphql/resolvers/queries';
import { GraphQLError } from 'graphql';

jest.mock('@/model/challenge-session.model', () => ({
  ChallengeSessionModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce([
        {
          _id: '1',
          challengeId: '6653e62d905e01e9966b273f',
          endAt: '2024-06-04T03:48:04.293+00:00',
          experiencePoint: 7,
          startedAt: '2024-06-04T03:48:04.293+00:00',
          studentEmail: 'test@gmail.com',
        },
      ])
      .mockResolvedValueOnce([])
      .mockRejectedValueOnce({ message: 'Error in get challenge sessions query' }),
  },
}));

describe('This query should return challenge sessions', () => {
  it('1. It should return challenge sessions from database', async () => {
    const challengeSessions = await getChallengeSessions();
    expect(challengeSessions).toEqual([
      {
        _id: '1',
        challengeId: '6653e62d905e01e9966b273f',
        endAt: '2024-06-04T03:48:04.293+00:00',
        experiencePoint: 7,
        startedAt: '2024-06-04T03:48:04.293+00:00',
        studentEmail: 'test@gmail.com',
      },
    ]);
  });

  it('2. It should return empty array if challenge sessions do not exist', async () => {
    const challengeSessions = await getChallengeSessions();
    expect(challengeSessions).toEqual([]);
  });

  it('3. It should return error', async () => {
    try {
      await getChallengeSessions();
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get challenge sessions query'));
    }
  });
});

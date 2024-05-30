import { getApprovedChallenges } from '@/graphql/resolvers/queries';
// import { ChallengeModel } from '@/model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/model/challenge.model.ts', () => ({
  ChallengeModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest
          .fn()
          .mockResolvedValueOnce([
            {
              author: 'teacher',
              courseId: {
                createdAt: '2024-05-27T08:08:10.590Z',
                status: 'Хичээл',
                thumbnail: 'https',
                title: 'Javascript',
              },
              quiz: [
                {
                  choices: [
                    {
                      isCorrect: true,
                      choice: 'test',
                    },
                  ],
                  choicesType: 'IMAGE',
                  question: 'test',
                },
              ],
              status: 'APPROVED',
            },
          ])
          .mockResolvedValueOnce([])
          .mockRejectedValueOnce({ message: 'Error in get challenges by approved status query' }),
      }),
    }),
  },
}));

describe('This query should return approved challenges', () => {
  it('It should return approved challenges from database', async () => {
    const challenge = await getApprovedChallenges!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(challenge).toEqual([
      {
        author: 'teacher',
        courseId: {
          createdAt: '2024-05-27T08:08:10.590Z',
          status: 'Хичээл',
          thumbnail: 'https',
          title: 'Javascript',
        },
        quiz: [
          {
            choices: [
              {
                isCorrect: true,
                choice: 'test',
              },
            ],
            choicesType: 'IMAGE',
            question: 'test',
          },
        ],
        status: 'APPROVED',
      },
    ]);
  });

  it('It should return empty array if approved challenges does no exist', async () => {
    const challenges = await getApprovedChallenges!();

    expect(challenges).toEqual([]);
  });

  it('It should return error', async () => {
    try {
      await getApprovedChallenges!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get challenges by approved status query'));
    }
  });
});

import { getDraftChallenges } from '@/graphql/resolvers/queries';
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
              status: 'DRAFT',
            },
          ])
          .mockResolvedValueOnce([])
          .mockRejectedValueOnce({ message: 'Error in get challenges by DRAFT status query' }),
      }),
    }),
  },
}));

describe('This query should return Draft challenges', () => {
  it('It should return draft challenges from database', async () => {
    const challenge = await getDraftChallenges!({}, {}, {}, {} as GraphQLResolveInfo);
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
        status: 'DRAFT',
      },
    ]);
  });

  it('It should return empty array if draft challenges does no exist', async () => {
    const challenges = await getDraftChallenges!();

    expect(challenges).toEqual([]);
  });

  it('It should return error', async () => {
    try {
      await getDraftChallenges!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get challenges by DRAFT status query'));
    }
  });
});

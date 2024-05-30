import { getArchiveChallenges } from '@/graphql/resolvers/queries';
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
              status: 'ARCHIVE',
            },
          ])
          .mockResolvedValueOnce([])
          .mockRejectedValueOnce({ message: 'Error in get challenges by archive status query' }),
      }),
    }),
  },
}));

describe('This query should return ARCHIVE challenges', () => {
  it('It should return ARCHIVE challenges from database', async () => {
    const challenge = await getArchiveChallenges!({}, {}, {}, {} as GraphQLResolveInfo);
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
        status: 'ARCHIVE',
      },
    ]);
  });

  it('It should return empty array if ARCHIVE challenges does no exist', async () => {
    const challenges = await getArchiveChallenges!();

    expect(challenges).toEqual([]);
  });

  it('It should return error if cannot get archived challnges', async () => {
    try {
      await getArchiveChallenges!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get challenges by archive status query'));
    }
  });
});

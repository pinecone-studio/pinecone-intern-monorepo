import { getChallenges } from '@/graphql/resolvers/queries';
import { GraphQLError } from 'graphql';

jest.mock('../../src/model/challenge.model.ts', () => ({
  ChallengeModel: {
    find: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce([
          {
            title: 'test',
            author: 'test',
            refCourse: 'test',
            status: 'test',
            quiz: ['662237cf4f5c3bd73c213f21', '662237cf4f5c3bd73c213f24'],
          },
        ])
        .mockResolvedValueOnce([])
        .mockRejectedValueOnce({ message: 'Error in get challenges query' }),
    }),
  },
}));
describe('This query should return challenge', () => {
  it('1. It should return challenges from database', async () => {
    const challenges = await getChallenges!();
    expect(challenges).toEqual([
      {
        title: 'test',
        author: 'test',
        refCourse: 'test',
        status: 'test',
        quiz: ['662237cf4f5c3bd73c213f21', '662237cf4f5c3bd73c213f24'],
      },
    ]);
  });

  it('2. It should return empty array if challenges does no exist', async () => {
    const challenges = await getChallenges!();

    expect(challenges).toEqual([]);
  });

  it('3. It should return error', async () => {
    try {
      await getChallenges!();
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get challenges query'));
    }
  });
});

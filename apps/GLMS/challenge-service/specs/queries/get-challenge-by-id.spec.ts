import { getChallengeById } from '@/graphql/resolvers/queries';
import { GraphQLError } from 'graphql';

jest.mock('../../src/model/challenge.model.ts', () => ({
  ChallengeModel: {
    findOne: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce({
          _id: '1',
          title: 'test',
          author: 'test',
          courseId: 'test',
          status: 'test',
          quiz: ['662237cf4f5c3bd73c213f21', '662237cf4f5c3bd73c213f24'],
        })
        .mockRejectedValue({ message: 'Error in get challenge by id query' }),
    }),
  },
}));

describe('get challenge by id', () => {
  it('should get a challenge', async () => {
    const result = await getChallengeById!({}, { courseId: 'test' }, {});
    expect(result).toEqual({
      _id: '1',
      title: 'test',
      author: 'test',
      courseId: 'test',
      status: 'test',
      quiz: ['662237cf4f5c3bd73c213f21', '662237cf4f5c3bd73c213f24'],
    });
  });

  it('should return error', async () => {
    try {
      await getChallengeById({}, { courseId: 'test' });
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get challenge by id query'));
    }
  });
});

import { deleteJob } from '@/graphql/resolvers/mutations';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/models/job', () => ({
  JobModel: {
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        id: '03591389534',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('Delete Author', () => {
  it('should delete a job', async () => {
    const result = await deleteJob!({}, { id: '03591389534' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      id: '03591389534',
    });
  });
  it("should trhrow an error if the author doesn't exist", async () => {
    try {
      await deleteJob!({}, { id: '03591389534' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Cannot delete job' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

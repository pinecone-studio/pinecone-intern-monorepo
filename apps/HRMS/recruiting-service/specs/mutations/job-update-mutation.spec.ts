import { updateJob } from '@/graphql/resolvers/mutations';
import { JobModel } from '@/models/job';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/job');

const input = {
  title: 'Test Updated Job',
};

describe('updateJob', () => {
  it('1. should update a job', async () => {
    const updatedJob = { id: '1', ...input };
    (JobModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedJob);
    const result = await updateJob({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(updatedJob);
  });

  it("2. should throw an error if the job doesn't update", async () => {
    (JobModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    try {
      await updateJob({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Cannot update job' }, errorTypes.INTERNAL_SERVER_ERROR));
    }
  });

  it('3. should throw an error if input is not provided', async () => {
    try {
      await updateJob({}, { id: '1', input: undefined }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Input is required' }, errorTypes.INTERNAL_SERVER_ERROR));
    }
  });
});

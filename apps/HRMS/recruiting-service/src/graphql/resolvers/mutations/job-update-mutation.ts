import { RequireFields, MutationUpdateJobArgs, MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';
import { JobModel } from '@/models/job';

export const updateJob: MutationResolvers['updateJob'] = async (_, { id, input }: RequireFields<MutationUpdateJobArgs, 'id'>) => {
  if (!input) {
    throw new Error('Input is required');
  }
  try {
    const updatedJob = await JobModel.findByIdAndUpdate(id, input, { new: true });
    if (!updatedJob) {
      throw new Error('Job not found');
    }
    return updatedJob;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Cannot update job' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

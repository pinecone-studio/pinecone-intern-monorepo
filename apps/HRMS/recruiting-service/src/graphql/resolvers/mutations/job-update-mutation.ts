import { RequireFields, MutationUpdateJobArgs, MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';
import { JobModel } from '@/models/job';

export const updateJob: MutationResolvers['updateJob'] = async (_, { id, input }: RequireFields<MutationUpdateJobArgs, 'id'>) => {
  if (!input) {
    throw graphqlErrorHandler({ message: 'Input is required' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
  try {
    const updatedJob = await JobModel.findByIdAndUpdate(id, input, { new: true });
    if (!updatedJob) {
      throw graphqlErrorHandler({ message: 'Job not found' }, errorTypes.INTERNAL_SERVER_ERROR);
    }
    return updatedJob;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Cannot update job' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

import { RequireFields, MutationUpdateJobArgs, MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';
import { JobModel } from '@/models/job';

export const deleteJob: MutationResolvers['deleteJob'] = async (_, { id }: RequireFields<MutationUpdateJobArgs, 'id'>) => {
  try {
    const deletedJob = await JobModel.findByIdAndDelete(id);
    if (!deletedJob) {
      throw new Error('Job not found');
    }
    return deletedJob;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Cannot delete job' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

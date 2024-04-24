import { JobModel } from '@/models/job';
import { errorTypes, graphqlErrorHandler } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getJobById: QueryResolvers['getJobById'] = async (_, { jobId }) => {
  try {
    const getJobById = await JobModel.findById(jobId);
    if (!getJobById) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }
    return getJobById;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

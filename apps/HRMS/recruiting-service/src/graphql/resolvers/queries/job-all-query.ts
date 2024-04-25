import { JobModel } from '@/models/job';
import { errorTypes, graphqlErrorHandler } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getJobs: QueryResolvers['getJobs'] = async () => {
  try {
    const getJobs = await JobModel.find();
    return getJobs;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

import { JobModel } from '@/models/job';
import { errorTypes, graphqlErrorHandler } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getJobsWithLimit: QueryResolvers['getJobsWithLimit'] = async (_, { offset, limit }) => {
  try {
    return await JobModel.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

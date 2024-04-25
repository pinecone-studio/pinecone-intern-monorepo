import { JobModel } from '@/models/job';
import { errorTypes, graphqlErrorHandler } from '../error';
import { MutationResolvers, JobResolvers } from '@/graphql/generated';

export const createJobRecruit: MutationResolvers['createJobRecruit'] = async (_, { input }: JobResolvers) => {
  try {
    const createJobRecruit = await JobModel.create({ input });
    return createJobRecruit;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

import { JobModel } from '@/models/job';
import { errorTypes, graphqlErrorHandler } from '../error';
import { MutationResolvers } from '@/graphql/generated';

export const createJobRecruit: MutationResolvers['createJobRecruit'] = async (_, { input }) => {
  try {
    const createJobRecruit = await JobModel.create(input);
    return createJobRecruit;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};

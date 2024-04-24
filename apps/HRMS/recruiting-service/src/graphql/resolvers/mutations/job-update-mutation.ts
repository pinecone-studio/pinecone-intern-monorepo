// import { JobResolvers, MutationResolvers } from '@/graphql/generated';
// import { JobModel } from '@/models/job';
// import { errorTypes, graphqlErrorHandler } from '../error';

// export const updateJobRecruit: MutationResolvers = async (_, { jobId, input }: JobResolvers) => {
//   try {
//     const { title, description, requirements, minSalary, maxSalary } = input;
//     const updateRecruit = JobModel.updateOne({ _id: jobId }, { title, description, requirements, minSalary, maxSalary });
//     return await JobModel.findById(jobId);
//   } catch (error) {
//     throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR);
//   }
// };

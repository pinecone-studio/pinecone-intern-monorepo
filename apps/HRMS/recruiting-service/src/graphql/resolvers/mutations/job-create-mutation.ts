// import { JobModel } from '@/models/job';
// import  { errorTypes, graphqlErrorHandler } from '../error';
// import { JobResolvers, MutationResolvers } from '@/graphql/generated';

// export const createJobRecruit: MutationResolvers['createJobRecruit'] = async (_, { input }: JobResolvers) => {
//   try {
//     const { title, description, requirements, minSalary, maxSalary, status } = input;
//     const newJobRecruit = new JobModel({
//       title,
//       description,
//       requirements: requirements || {},
//       minSalary,
//       maxSalary,
//       status,
//     });
//     return await newJobRecruit.save();
//   } catch (error) {
//     throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR);
//   }
// };

import { ApplicantModel } from '@/models/applicant';
import { errorTypes, graphqlErrorHandler } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getApplicantWithLimit: QueryResolvers['getApplicantWithLimit'] = async (_, { offset, limit }) => {
  try {
    return await ApplicantModel.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

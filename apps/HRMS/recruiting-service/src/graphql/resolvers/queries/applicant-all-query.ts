import { ApplicantModel } from '@/models/applicant';
import { errorTypes, graphqlErrorHandler } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getApplicants: QueryResolvers['getApplicants'] = async () => {
  try {
    const getApplicants = await ApplicantModel.find();
    return getApplicants;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

import { ApplicantModel } from '@/models/applicant';
import { errorTypes, graphqlErrorHandler } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getApplicantById: QueryResolvers['getApplicantById'] = async (_, { applicantId }) => {
  try {
    const getApplicantById = await ApplicantModel.findById(applicantId);
    if (!getApplicantById) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }
    return getApplicantById;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

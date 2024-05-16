import { ApplicantModel } from '@/models/applicant';
import { errorTypes, graphqlErrorHandler } from '../error';
import { MutationResolvers } from '@/graphql/generated';

export const createApplicant: MutationResolvers['createApplicant'] = async (_, { createApplicantInput }) => {
  try {
    const createApplicant = await ApplicantModel.create(createApplicantInput);
    return createApplicant;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};

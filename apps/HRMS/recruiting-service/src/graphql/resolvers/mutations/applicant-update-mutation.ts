import { RequireFields, MutationUpdateApplicantArgs, MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';
import { ApplicantModel } from '@/models/applicant';

export const updateApplicant: MutationResolvers['updateApplicant'] = async (_, { id, input }: RequireFields<MutationUpdateApplicantArgs, 'id'>) => {
  try {
    const updateApplicant = await ApplicantModel.findByIdAndUpdate(id, input, { new: true });
    if (!updateApplicant) {
      throw graphqlErrorHandler({ message: 'Applicant not found' }, errorTypes.INTERNAL_SERVER_ERROR);
    }
    return updateApplicant;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Cannot update Applicant' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

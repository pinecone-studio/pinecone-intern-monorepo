import { RequireFields, MutationDeleteApplicantArgs, MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';
import { ApplicantModel } from '@/models/applicant';

export const deleteApplicant: MutationResolvers['deleteApplicant'] = async (_, { id }: RequireFields<MutationDeleteApplicantArgs, 'id'>) => {
  try {
    const deleteApplicant = await ApplicantModel.findByIdAndDelete(id);
    if (!deleteApplicant) {
      throw new Error('Job not found');
    }
    return deleteApplicant;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Cannot delete Applicant' }, errorTypes.INTERNAL_SERVER_ERROR);
  }
};

import { Dependent, MutationResolvers } from '@/graphql/generated';
import { DependentModel } from '@/models/dependent';

export const deleteDependent: MutationResolvers['DependentDelete'] = async (_: string, { _id }: Dependent) => {
  const deleteDependentId = await DependentModel.findByIdAndDelete(_id);
  if (!deleteDependentId) {
    throw new Error('failed delete dependent');
  }
  return deleteDependentId;
};

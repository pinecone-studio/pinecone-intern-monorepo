import { Dependent, MutationResolvers } from '@/graphql/generated';
import { DependentModel } from '@/models/dependent';

export const deleteDependent: MutationResolvers['Dependent'] = async (_: string, { _id }: any) => {
  const deleteDependentId = await DependentModel.findByIdAndDelete(_id);
  if (!deleteDependentId) {
    throw new Error('failed delete dependent');
  }
  return deleteDependentId;
};

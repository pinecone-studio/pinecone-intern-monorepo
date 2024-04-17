import { Dependent, MutationResolvers } from '@/graphql/generated';
import { DependentModel } from '@/models/dependent';

export const updateDependent: MutationResolvers['Dependent'] = async (_: string, { _id, firstName, lastName, phone, dependency }: Dependent) => {
  const updateDependenId = await DependentModel.findByIdAndUpdate(_id, { firstName: firstName, lastName: lastName, phone: phone, dependency: dependency });
  if (!updateDependenId) {
    throw new Error('failed update dependent');
  }
  return updateDependenId;
};

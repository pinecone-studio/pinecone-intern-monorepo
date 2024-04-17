import { Dependent, MutationResolvers } from '@/graphql/generated';
import { DependentModel } from '@/models/dependent';

export const getDependent: MutationResolvers['Dependent'] = async (_: string, { _id }: Dependent) => {
  const getDependent = await DependentModel.findById(_id);
  if (!getDependent) {
    throw new Error('failed get dependent');
  }
  return getDependent;
};

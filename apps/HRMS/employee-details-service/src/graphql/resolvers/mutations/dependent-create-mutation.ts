import { MutationCreateDependentArgs, MutationResolvers } from '@/graphql/generated';
import { DependentModel } from '../../../models/dependent';

export const createDependent: MutationResolvers['Dependent'] = async (_: string, { firstName, lastName, phone, dependency }: MutationCreateDependentArgs) => {
  const create = await DependentModel.create({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    dependency: dependency,
  });
  if (!create) {
    throw new Error('failed create dependent');
  }
  return create;
};

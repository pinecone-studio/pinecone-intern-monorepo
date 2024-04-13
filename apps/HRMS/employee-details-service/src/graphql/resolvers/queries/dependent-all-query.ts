import { DependentModel } from '@/models/dependent';

export const getAllDependents = async () => {
  const getAllDependents = await DependentModel.find();
  if (!getAllDependents) {
    throw new Error('failed get all dependents');
  }
  return getAllDependents;
};

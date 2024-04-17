import { DependentModel } from '@/models/dependent';

export const getAllDependents = async () => {
  const getAllDependents = await DependentModel.find();
  return getAllDependents;
};

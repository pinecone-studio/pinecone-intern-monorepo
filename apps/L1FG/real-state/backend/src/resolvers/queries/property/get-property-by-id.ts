import { QueryResolvers } from '../../../generated';
import { PropertyFeatureModel } from '../../../models';

export const getPropertyByID: QueryResolvers['getPropertyByID'] = async (_, { _id }) => {
  const property = await PropertyFeatureModel.findById(_id);
  if (!property) throw new Error('Property not found');
  return property;
};

import { QueryResolvers } from '../../../generated';
import { PropertyFeatureModel } from '../../../models';

export const getProperties: QueryResolvers['getProperties'] = async (_, { options = {} }) => {
  const { filter } = options;
  const property = await PropertyFeatureModel.find(filter);
  return property;
};

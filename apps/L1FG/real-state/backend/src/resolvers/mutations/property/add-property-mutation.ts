import { MutationResolvers } from '../../../generated';
import { PropertyFeatureModel } from '../../../models';

export const addProperty: MutationResolvers['addProperty'] = async (_, { input }) => {
  const { houseType, size, images, totalRooms, garage, restrooms, location, details, uploadedAt, createdAt } = input;

  const property = await PropertyFeatureModel.create({ houseType, size, images, totalRooms, garage, restrooms, location, details, uploadedAt, createdAt });

  return property;
};

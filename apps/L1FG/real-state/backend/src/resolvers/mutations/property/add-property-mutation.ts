import { MutationResolvers } from '../../../generated';
import { PropertyFeatureModel } from '../../../models';

export const addProperty: MutationResolvers['addProperty'] = async (_, { input }) => {
  const { townName, price, houseType, size, images, totalRooms, garage, broadExplanation, restrooms, location, details, uploadedAt, createdAt } = input;

  const property = await PropertyFeatureModel.create({ townName, price, houseType, size, images, totalRooms, garage, broadExplanation, restrooms, location, details, uploadedAt, createdAt });

  return property;
};

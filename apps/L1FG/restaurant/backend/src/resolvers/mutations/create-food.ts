import { MutationResolvers } from '../../generated';
import { FoodModel } from '../../models/food';

export const createFood: MutationResolvers['createFood'] = async (_, { input }) => {
  const savedOrder = await FoodModel.create(input);

  return savedOrder;
};

import { MutationResolvers } from 'src/generated';
import { FoodModel } from 'src/models/food.model';

export const createFood: MutationResolvers['createFood'] = async (_, { input: { foodName, price, image, status } }) => {
  const newFood = await FoodModel.create({ foodName, price, image, status });

  return newFood;
};

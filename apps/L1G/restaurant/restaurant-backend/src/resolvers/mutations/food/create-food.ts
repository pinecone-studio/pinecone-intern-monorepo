import { MutationResolvers } from 'src/generated';
import { FoodModel } from 'src/models/food.model';

export const createFood: MutationResolvers['createFood'] = async (_, { input: { foodName, price, image, foodStatus } }) => {
  try {
    const newFood = await FoodModel.create({ foodName, price, image, foodStatus });
    return newFood;
  } catch (error) {
    throw new Error(`Failed to create food`);
  }
};

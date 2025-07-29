import { FoodModel } from 'src/models/food.model';
import { QueryResolvers } from '../../../generated';

export const getFood: QueryResolvers['getFood'] = async (_, { foodId }) => {
  const food = await FoodModel.findById(foodId);

  if (!food) {
    throw new Error(`Food with ID ${foodId} is not found`);
  }

  return food;
};

import { FoodModel } from 'src/models/food.model';
import { QueryResolvers } from 'src/generated';

export const getFoodById: QueryResolvers['getFoodById'] = async (_, { foodId }) => {
  const food = await FoodModel.findById(foodId).populate(['category', 'discount']);
  if (!food) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return food;
};

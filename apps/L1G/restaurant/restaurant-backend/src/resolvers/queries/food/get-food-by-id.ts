import { FoodModel, FoodPopulatedType } from 'src/models/food.model';
import { QueryResolvers } from 'src/generated';
import { mapFood } from 'src/utils/types/food-type';

export const getFoodById: QueryResolvers['getFoodById'] = async (_, { foodId }) => {
  const food = (await FoodModel.findById(foodId).populate('category').populate('discount')) as FoodPopulatedType;
  if (!food) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return mapFood(food);
};

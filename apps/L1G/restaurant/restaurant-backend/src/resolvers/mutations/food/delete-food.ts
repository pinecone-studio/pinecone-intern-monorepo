import { MutationResolvers } from 'src/generated';
import { FoodModel, FoodPopulatedType } from 'src/models/food.model';
import { mapFood } from 'src/utils/types/food-type';

export const deleteFood: MutationResolvers['deleteFood'] = async (_, { foodId }) => {
  const deletedFood = (await FoodModel.findByIdAndDelete(foodId).populate('category')) as FoodPopulatedType;
  if (!deletedFood) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return mapFood(deletedFood);
};

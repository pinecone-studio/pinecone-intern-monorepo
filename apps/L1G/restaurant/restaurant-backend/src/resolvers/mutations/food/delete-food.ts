import { MutationResolvers } from 'src/generated';
import { FoodModel } from 'src/models/food.model';

export const deleteFood: MutationResolvers['deleteFood'] = async (_, { foodId }) => {
  const deletedFood = await FoodModel.findByIdAndDelete(foodId);
  if (!deletedFood) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return deletedFood;
};

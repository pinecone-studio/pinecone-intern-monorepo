import { MutationResolvers } from 'src/generated';
import { FoodModel } from 'src/models/food.model';

export const updateFoodByStatus: MutationResolvers['updateFoodByStatus'] = async (_, { foodId, foodStatus }) => {
  const toUpdatedFoodByStatus = await FoodModel.findByIdAndUpdate(foodId, { foodStatus: foodStatus }, { new: true, runValidators: true }).populate(['category', 'discount']);
  if (!toUpdatedFoodByStatus) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return toUpdatedFoodByStatus;
};

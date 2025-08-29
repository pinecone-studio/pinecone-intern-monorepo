import { MutationResolvers } from 'src/generated';
import { FoodModel } from 'src/models/food.model';

export const updateFood: MutationResolvers['updateFood'] = async (_, { foodId, input: { foodName, price, image, foodStatus } }) => {
  const updatedFood = await FoodModel.findByIdAndUpdate(foodId, { $set: { foodName, price, image, foodStatus } }, { new: true, runValidators: true });
  if (!updatedFood) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return updatedFood;
};

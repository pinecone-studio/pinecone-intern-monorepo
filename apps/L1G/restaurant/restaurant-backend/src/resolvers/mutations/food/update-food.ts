import { MutationResolvers } from 'src/generated';
import { FoodModel } from 'src/models/food.model';

export const updateFood: MutationResolvers['updateFood'] = async (_, { foodId, input: { foodName, price, image, foodStatus, categoryId } }) => {
  const updatedFood = await FoodModel.findByIdAndUpdate(foodId, { $set: { foodName, price, image, foodStatus, categoryId } }, { new: true, runValidators: true }).populate('category');
  if (!updatedFood) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return updatedFood;
};

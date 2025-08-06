import { MutationResolvers } from 'src/generated';
import { FoodModel, FoodPopulatedType } from 'src/models/food.model';
import { mapFood } from 'src/utils/types/food-type';

export const updateFood: MutationResolvers['updateFood'] = async (_, { foodId, input: { foodName, price, image, status, categoryId } }) => {
  const updatedFood = (await FoodModel.findByIdAndUpdate(foodId, { $set: { foodName, price, image, status, categoryId } }, { new: true, runValidators: true }).populate(
    'category'
  )) as FoodPopulatedType;
  if (!updatedFood) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return mapFood(updatedFood);
};

import { MutationResolvers } from 'src/generated';
import { FoodModel, FoodPopulatedType } from 'src/models/food.model';
import { mapFood } from 'src/utils/types/food-type';

export const updateFoodByDiscount: MutationResolvers['updateFoodByDiscount'] = async (_, { foodId, discountId }) => {
  const toUpdatedFoodByDiscount = (await FoodModel.findByIdAndUpdate(foodId, { discount: discountId }, { new: true, runValidators: true })
    .populate('category')
    .populate('discount')) as FoodPopulatedType;
  if (!toUpdatedFoodByDiscount) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return mapFood(toUpdatedFoodByDiscount);
};

import { MutationResolvers } from 'src/generated';
import { FoodModel } from 'src/models/food.model';

export const updateFoodByDiscount: MutationResolvers['updateFoodByDiscount'] = async (_, { foodId, discountId }) => {
  const toUpdatedFoodByDiscount = await FoodModel.findByIdAndUpdate(foodId, { discount: discountId }, { new: true, runValidators: true }).populate(['category', 'discount']);
  if (!toUpdatedFoodByDiscount) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
  return toUpdatedFoodByDiscount;
};

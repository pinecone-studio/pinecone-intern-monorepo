import { MutationResolvers } from 'src/generated';
import { DiscountModel } from 'src/models/discount.model';
import { FoodModel } from 'src/models/food.model';

export const deleteFoodFromDiscount: MutationResolvers['deleteFoodFromDiscount'] = async (_, { foodId, discountId }) => {
  const existingDiscount = await DiscountModel.findById(discountId);
  if (!existingDiscount) {
    throw new Error(`Discount with ID ${discountId} not found`);
  }

  const existingFood = await FoodModel.findById(foodId);
  if (!existingFood) {
    throw new Error(`Food with ID ${foodId} not found`);
  }

  try {
    await DiscountModel.findByIdAndUpdate(discountId, {
      $pull: {
        food: foodId,
      },
    });

    await FoodModel.findByIdAndUpdate(foodId, {
      $unset: { discount: '' },
    });

    const updatedFood = await FoodModel.findById(foodId).populate(['category', 'discount']);

    return updatedFood;
  } catch (error) {
    throw new Error(`Failed to remove food`);
  }
};

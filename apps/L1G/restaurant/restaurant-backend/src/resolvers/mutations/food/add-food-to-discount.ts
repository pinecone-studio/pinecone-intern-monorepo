import { MutationResolvers } from 'src/generated';
import { DiscountModel } from 'src/models/discount.model';
import { FoodModel } from 'src/models/food.model';

const validateDiscountAndFood = async (discountId: string, foodId: string) => {
  const existingDiscount = await DiscountModel.findById(discountId);
  if (!existingDiscount) {
    throw new Error(`Discount with ID ${discountId} not found`);
  }

  const existingFood = await FoodModel.findById(foodId);
  if (!existingFood) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
};

export const addFoodToDiscount: MutationResolvers['addFoodToDiscount'] = async (_, { foodId, discountId }) => {
  await validateDiscountAndFood(discountId, foodId);

  try {
    await DiscountModel.findByIdAndUpdate(discountId, {
      $addToSet: {
        food: foodId,
      },
    });

    await FoodModel.findByIdAndUpdate(foodId, { discount: discountId });

    const updatedDiscount = await DiscountModel.findById(discountId).populate({
      path: 'food',
      populate: {
        path: 'category discount',
      },
    });
    return updatedDiscount?.food || [];
  } catch (error) {
    throw new Error(`Failed to add food`);
  }
};

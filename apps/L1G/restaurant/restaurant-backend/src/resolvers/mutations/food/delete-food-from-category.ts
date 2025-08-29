import { MutationResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';
import { FoodModel } from 'src/models/food.model';

export const deleteFoodFromCategory: MutationResolvers['deleteFoodFromCategory'] = async (_, { foodId, categoryId }) => {
  const existingCategory = await CategoryModel.findById(categoryId);
  if (!existingCategory) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }

  const existingFood = await FoodModel.findById(foodId);
  if (!existingFood) {
    throw new Error(`Food with ID ${foodId} not found`);
  }

  try {
    await CategoryModel.findByIdAndUpdate(categoryId, {
      $pull: {
        food: foodId,
      },
    });

    await FoodModel.findByIdAndUpdate(foodId, {
      $unset: { category: '' },
    });

    const updatedFood = await FoodModel.findById(foodId).populate(['category', 'discount']);

    return updatedFood;
  } catch (error) {
    throw new Error(`Failed to remove food`);
  }
};

import { MutationResolvers } from '../../generated';
import { FoodModel } from '../../models/food';
import { CategoryModel } from '../../models/category';

export const updateFoodCategory: MutationResolvers['updateFoodCategory'] = async (_, { input }) => {
  const { foodId, categoryId } = input;

  // Check if the category exists
  const categoryExists = await CategoryModel.findById(categoryId);
  if (!categoryExists) {
    throw new Error('Category not found');
  }

  // Find the food item
  const food = await FoodModel.findById(foodId);
  if (!food) {
    throw new Error('Food item not found');
  }

  // Update the food item's category
  food.categoryId = categoryId;
  await food.save();

  // Return foodId and categoryId
  return {
    foodId: food._id.toString(),
    categoryId: food.categoryId.toString(), // Remove the null check since we know it exists
  };
};

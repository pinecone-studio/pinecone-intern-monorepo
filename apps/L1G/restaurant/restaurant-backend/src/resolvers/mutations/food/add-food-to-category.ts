import { MutationResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';
import { FoodModel } from 'src/models/food.model';

const validateCategoryAndFood = async (categoryId: string, foodId: string) => {
  const existingCategory = await CategoryModel.findById(categoryId);
  if (!existingCategory) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }

  const existingFood = await FoodModel.findById(foodId);
  if (!existingFood) {
    throw new Error(`Food with ID ${foodId} not found`);
  }
};

export const addFoodToCategory: MutationResolvers['addFoodToCategory'] = async (_, { foodId, categoryId }) => {
  await validateCategoryAndFood(categoryId, foodId);

  try {
    await CategoryModel.findByIdAndUpdate(categoryId, {
      $addToSet: {
        food: foodId,
      },
    });

    await FoodModel.findByIdAndUpdate(foodId, { category: categoryId });

    const updatedCategory = await CategoryModel.findById(categoryId).populate({
      path: 'food',
      populate: {
        path: 'category discount',
      },
    });
    return updatedCategory?.food || [];
  } catch (error) {
    throw new Error(`Failed to add food`);
  }
};

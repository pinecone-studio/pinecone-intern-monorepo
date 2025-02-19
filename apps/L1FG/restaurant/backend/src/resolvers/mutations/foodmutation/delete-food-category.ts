import { MutationResolvers, Response } from '../../../generated';
import { FoodModel } from '../../../models';

export const deleteFoodCategory: MutationResolvers['deleteFoodCategory'] = async (_, { input }) => {
  const { id } = input;

  // Find the food item by ID
  const food = await FoodModel.findById(id);
  if (!food) {
    return {
      status: Response.Failure,
      message: 'Food item not found',
    };
  }

  // Nullify the categoryId field
  food.categoryId = null;
  await food.save();

  return {
    status: Response.Success,
    message: 'Food item categoryId removed successfully',
  };
};

import { MutationResolvers, Response } from '../../../generated';
import { FoodModel } from '../../../models';

export const deleteFood: MutationResolvers['deleteFood'] = async (_, { foodId }) => {
  try {
    const deletedFood = await FoodModel.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return { status: Response.Failure, message: 'Food not found' };
    }

    return { status: Response.Success, message: 'Food deleted successfully' };
  } catch (error) {
    return { status: Response.Failure, message: 'Failed to delete food' };
  }
};

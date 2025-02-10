import { MutationResolvers } from '../../../generated';
import { FoodModel } from '../../../models';

export const updateFood: MutationResolvers['updateFood'] = async (_, { input }) => {
  try {
    const { foodId, ...updateFields } = input;

    const updatedFood = await FoodModel.findByIdAndUpdate(foodId, { ...updateFields }, { new: true });

    return updatedFood;
  } catch (error) {
    throw new Error('Failed to edit food');
  }
};

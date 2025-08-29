import { FoodModel } from 'src/models/food.model';
import { QueryResolvers } from 'src/generated';

export const getFoodsByStatus: QueryResolvers['getFoodsByStatus'] = async (_, { foodStatus }) => {
  try {
    const foodsByStatus = (await FoodModel.find({ foodStatus: foodStatus }).populate(['category', 'discount'])) as any;

    return foodsByStatus;
  } catch (error) {
    throw new Error(`Failed to fetch foods`);
  }
};

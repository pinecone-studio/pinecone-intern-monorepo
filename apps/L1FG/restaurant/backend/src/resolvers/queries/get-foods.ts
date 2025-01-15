import { QueryResolvers } from '../../generated';
import { FoodModel } from '../../models/food';

export const getFoods: QueryResolvers['getFoods'] = async () => {
  try {
    const foods = await FoodModel.find();

    return foods;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error fetching food items: ' + error.message);
    }

    throw new Error('Error fetching food items: An unknown error occurred');
  }
};

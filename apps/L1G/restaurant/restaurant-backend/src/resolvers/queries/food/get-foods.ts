import { FoodModel } from 'src/models/food.model';
import { QueryResolvers } from 'src/generated';

export const getFoods: QueryResolvers['getFoods'] = async () => {
  try {
    const foods = (await FoodModel.find().populate(['category', 'discount'])) as any;
    return foods;
  } catch (error) {
    throw new Error(`Failed to fetch foods`);
  }
};

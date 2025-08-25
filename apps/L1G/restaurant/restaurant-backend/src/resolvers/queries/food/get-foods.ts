import { FoodModel, FoodPopulatedType } from 'src/models/food.model';
import { QueryResolvers } from 'src/generated';
import { mapFood } from 'src/utils/types/food-type';

export const getFoods: QueryResolvers['getFoods'] = async () => {
  try {
    const foods = (await FoodModel.find().populate('category').populate('discount')) as FoodPopulatedType[];
    return foods.map(mapFood);
  } catch (error) {
    throw new Error(`Failed to fetch foods`);
  }
};

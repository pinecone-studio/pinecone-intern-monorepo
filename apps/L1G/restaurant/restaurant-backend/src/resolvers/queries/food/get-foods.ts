import { FoodModel } from 'src/models/food.model';
import { QueryResolvers } from '../../../generated';

export const getFoods: QueryResolvers['getFoods'] = async () => {
  const foods = await FoodModel.find();

  return foods;
};

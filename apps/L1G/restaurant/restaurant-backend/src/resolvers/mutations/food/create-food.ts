import { MutationResolvers } from 'src/generated';
import { FoodModel, FoodPopulatedType } from 'src/models/food.model';
import { mapFood } from 'src/utils/types/food-type';

export const createFood: MutationResolvers['createFood'] = async (_, { input: { foodName, price, image, status, categoryId } }) => {
  try {
    const newFood = await FoodModel.create({ foodName, price, image, status, category: categoryId });
    const populatedFood = (await newFood.populate('category')) as FoodPopulatedType;
    return mapFood(populatedFood);
  } catch (error) {
    throw new Error(`Failed to create food`);
  }
};

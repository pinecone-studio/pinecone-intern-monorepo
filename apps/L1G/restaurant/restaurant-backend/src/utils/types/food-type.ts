import { FoodPopulatedType } from 'src/models/food.model';
import { mapCategory } from './category-type';

export function mapFood(food: FoodPopulatedType) {
  return {
    foodId: food._id.toString(),
    foodName: food.foodName,
    price: food.price,
    image: food.image,
    status: food.status,
    category: mapCategory(food.category),
  };
}

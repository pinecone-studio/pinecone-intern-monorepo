import { FoodPopulatedType } from 'src/models/food.model';
import { mapCategory } from './category-type';
import { mapDiscount } from './discount-type';

export function mapFood(food: FoodPopulatedType) {
  return {
    foodId: food._id.toString(),
    foodName: food.foodName,
    price: food.price,
    image: food.image,
    status: food.status,
    category: mapCategory(food.category),
    discount: food.discount ? mapDiscount(food.discount) : undefined,
    createdAt: food.createdAt.toLocaleString(),
    updatedAt: food.updatedAt.toLocaleString(),
  };
}

import { CategoryType } from 'src/models/category.model';

export function mapCategory(category: CategoryType) {
  return {
    categoryId: category._id.toString(),
    categoryName: category.categoryName,
  };
}

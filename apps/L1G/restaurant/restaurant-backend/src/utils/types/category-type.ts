import { Category } from 'src/models/category.model';

export function mapCategory(category: Category) {
  return {
    categoryId: category._id.toString(),
    categoryName: category.categoryName,
  };
}

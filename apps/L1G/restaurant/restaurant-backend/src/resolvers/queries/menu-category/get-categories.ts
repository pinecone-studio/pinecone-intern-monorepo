import { MenuCategoryModel } from 'src/models/menu-category.model';
import { QueryResolvers } from '../../../generated';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  const categories = await MenuCategoryModel.find();

  return categories;
};

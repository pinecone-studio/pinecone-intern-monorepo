import { MutationResolvers } from 'src/generated';
import { MenuCategoryModel } from 'src/models/menu-category.model';

export const createCategory: MutationResolvers['createCategory'] = async (_, { input: { categoryName } }) => {
  const newCategory = await MenuCategoryModel.create({ categoryName });

  return newCategory;
};

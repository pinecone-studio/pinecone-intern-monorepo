import { MutationResolvers } from '@/graphql/generated';
import { CategoryModel } from '@/models/category.model';

export const updateCategory: MutationResolvers['updateCategory'] = async (_, { _id, name }) => {
  const category = await CategoryModel.findByIdAndUpdate(_id, { name }, { new: true });

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};
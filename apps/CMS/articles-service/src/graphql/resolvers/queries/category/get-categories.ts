import { CategoryModel } from '@/models';
import { QueryResolvers } from '../../../generated';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  const categories = await CategoryModel.find({});

  return categories;
};

import { QueryResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  try {
    const categories = (await CategoryModel.find().populate({
      path: 'food',
      populate: [{ path: 'category' }, { path: 'discount' }],
    })) as any;
    return categories;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

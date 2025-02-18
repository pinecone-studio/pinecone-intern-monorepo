import { MutationResolvers, Response } from '../../../generated';
import { CategoryModel } from '../../../models/category';

export const deleteCategory: MutationResolvers['deleteCategory'] = async (_, { id }) => {
  const deletedCategory = await CategoryModel.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new Error('Category not found');
  }
  return { status: Response.Success, message: 'Successfully deleted category' };
};

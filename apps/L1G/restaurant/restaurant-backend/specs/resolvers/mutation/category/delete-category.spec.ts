import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { deleteCategory } from 'src/resolvers/mutations';

jest.mock('src/models/category.model', () => ({
  CategoryModel: {
    findByIdAndDelete: jest.fn().mockResolvedValue({
      _id: '1',
      categoryName: 'Test',
    }),
  },
}));

describe('deleteCategory', () => {
  it('should delete a category', async () => {
    const result = await deleteCategory?.({}, { categoryId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      categoryName: 'Test',
    });
  });

  it("should throw an error if the category doesn't exist", async () => {
    (CategoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteCategory?.({}, { categoryId: '3' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Category with ID 3 is not found');

    expect(CategoryModel.findByIdAndDelete).toHaveBeenCalledWith('3');
  });
});

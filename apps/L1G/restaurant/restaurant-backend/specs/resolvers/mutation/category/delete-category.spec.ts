import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { deleteCategory } from 'src/resolvers/mutations';

jest.mock('src/models/category.model', () => ({
  CategoryModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('deleteCategory', () => {
  it('should delete category', async () => {
    (CategoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue({
      categoryId: '1',
      categoryName: 'Test',
      createdAt: '',
      updatedAt: '',
    });

    const result = await deleteCategory?.({}, { categoryId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        categoryId: '1',
        categoryName: 'Test',
        createdAt: '',
        updatedAt: '',
      })
    );
  });

  it("should throw an error if the category doesn't exist", async () => {
    (CategoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteCategory?.({}, { categoryId: '3' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Category with ID 3 not found');

    expect(CategoryModel.findByIdAndDelete).toHaveBeenCalledWith('3');
  });
});

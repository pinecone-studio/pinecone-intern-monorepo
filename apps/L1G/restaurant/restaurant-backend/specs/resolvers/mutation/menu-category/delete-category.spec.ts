
import { GraphQLResolveInfo } from 'graphql';
import { MenuCategoryModel } from 'src/models/menu-category.model';
import { deleteCategory } from 'src/resolvers/mutations';

jest.mock('src/models/menu-category.model', () => ({
  MenuCategoryModel: {
    findByIdAndDelete: jest.fn().mockResolvedValue({
      categoryId: '1',
      categoryName: 'Test',
    }),
  },
}));

describe('deleteCategory', () => {
  it('should delete a category', async () => {
    const result = await deleteCategory?.({}, { categoryId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      categoryId: '1',
      categoryName: 'Test',
    });
  });

  it("should throw an error if the category doesn't exist", async () => {
    (MenuCategoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteCategory?.({}, { categoryId: '3' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Category with ID 3 is not found');

    expect(MenuCategoryModel.findByIdAndDelete).toHaveBeenCalledWith('3');
  });
});


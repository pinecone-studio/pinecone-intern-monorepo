import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { updateCategory } from 'src/resolvers/mutations';

jest.mock('src/models/category.model', () => ({
  CategoryModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      _id: '2',
      categoryName: 'Test',
    }),
  },
}));

describe('updateCategory', () => {
  it('should update a category', async () => {
    const result = await updateCategory?.(
      {},
      {
        categoryId: '2',
        input: {
          categoryName: 'Test',
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual({
      _id: '2',
      categoryName: 'Test',
    });
  });
  it("should throw an error if the category doesn't exist", async () => {
    (CategoryModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateCategory?.({}, { categoryId: '3', input: { categoryName: 'Test' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Category with ID 3 is not found');

    expect(CategoryModel.findByIdAndUpdate).toHaveBeenCalledWith('3', { $set: { categoryName: 'Test' } }, { new: true, runValidators: true });
  });
});

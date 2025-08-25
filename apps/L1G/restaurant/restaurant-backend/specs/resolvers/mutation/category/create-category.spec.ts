import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { createCategory } from 'src/resolvers/mutations';

jest.mock('src/models/category.model', () => ({
  CategoryModel: {
    create: jest.fn(),
  },
}));

describe('createCategory', () => {
  it('should create new category', async () => {
    (CategoryModel.create as jest.Mock).mockReturnValue({
      _id: '2',
      categoryName: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await createCategory?.({}, { input: { categoryName: 'Test' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        categoryId: '2',
        categoryName: 'Test',
      })
    );
  });
  it('should handle database errors', async () => {
    (CategoryModel.create as jest.Mock).mockRejectedValue(new Error('Failed to create category'));

    await expect(createCategory?.({}, { input: { categoryName: 'Test' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow();
  });
});

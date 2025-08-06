import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { createCategory } from 'src/resolvers/mutations';

jest.mock('src/models/category.model', () => ({
  CategoryModel: {
    create: jest.fn().mockReturnValue({
      categoryName: 'Test',
    }),
  },
}));

describe('createCategory', () => {
  it('should create a new category', async () => {
    const result = await createCategory?.({}, { input: { categoryName: 'Test' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      categoryName: 'Test',
    });
  });
  it('should handle database errors', async () => {
    (CategoryModel.create as jest.Mock).mockRejectedValueOnce(new Error('Failed to create a category'));

    await expect(createCategory?.({}, { input: { categoryName: 'Test' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow();
  });
});

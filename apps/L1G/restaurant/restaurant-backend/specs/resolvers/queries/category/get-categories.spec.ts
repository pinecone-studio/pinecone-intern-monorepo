import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { getCategories } from 'src/resolvers/queries';

jest.mock('src/models/category.model', () => ({
  CategoryModel: {
    find: jest.fn(),
  },
}));

describe('getCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return categories', async () => {
    (CategoryModel.find as jest.Mock).mockResolvedValue([
      {
        _id: '1',
        categoryName: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const result = await getCategories?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      expect.objectContaining({
        categoryId: '1',
        categoryName: 'Test',
      }),
    ]);
    expect(CategoryModel.find).toHaveBeenCalledTimes(1);
  });

  it('should handle database errors', async () => {
    (CategoryModel.find as jest.Mock).mockRejectedValue(new Error('Failed to fetch categories'));

    await expect(getCategories?.({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to fetch categories');
  });
});

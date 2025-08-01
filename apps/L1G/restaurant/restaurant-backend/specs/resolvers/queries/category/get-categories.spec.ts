import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { getCategories } from 'src/resolvers/queries';

jest.mock('src/models/category.model', () => ({
  CategoryModel: {
    find: jest.fn().mockReturnValue([
      {
        _id: '1',
        categoryName: 'Test',
      },
    ]),
  },
}));

describe('getCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return categories', async () => {
    const result = await getCategories?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '1',
        categoryName: 'Test',
      },
    ]);
    expect(CategoryModel.find).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no categories exist', async () => {
    (CategoryModel.find as jest.Mock).mockResolvedValue([]);
    const result = await getCategories?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([]);
    expect(CategoryModel.find).toHaveBeenCalledTimes(1);
  });

  it('should handle database errors', async () => {
    (CategoryModel.find as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch categories'));

    await expect(getCategories?.({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow();
  });
});

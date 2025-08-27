import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { getCategoryById } from 'src/resolvers/queries';

jest.mock('src/models/category.model', () => ({
  CategoryModel: {
    findById: jest.fn(),
  },
}));

describe('getCategoryById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return category', async () => {
    (CategoryModel.findById as jest.Mock).mockResolvedValue({
      categoryId: '2',
      categoryName: 'Test1',
    });
    const result = await getCategoryById?.({}, { categoryId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        categoryId: '2',
        categoryName: 'Test1',
      })
    );
    expect(CategoryModel.findById).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if the category doesn't exist", async () => {
    (CategoryModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getCategoryById?.({}, { categoryId: '3' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Category with ID 3 not found');

    expect(CategoryModel.findById).toHaveBeenCalledWith('3');
  });
});

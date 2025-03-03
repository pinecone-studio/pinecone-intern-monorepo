import { Response } from '../../../../src/generated';
import { CategoryModel } from '../../../../src/models';
import { deleteCategory } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models/category', () => ({
  CategoryModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('deleteCategory Mutation', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully delete a category when a valid ID is provided', async () => {
    // Mock successful deletion
    const mockDeletedCategory = {
      _id: '6787697d711647af5a0c118a',
      name: 'Beverages',
    };

    (CategoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedCategory);

    if (!deleteCategory) return;

    const result = await deleteCategory({}, { id: '6787697d711647af5a0c118a' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      status: Response.Success,
      message: 'Successfully deleted category',
    });
    expect(CategoryModel.findByIdAndDelete).toHaveBeenCalledWith('6787697d711647af5a0c118a');
    expect(CategoryModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when the category is not found', async () => {
    // Mock the findByIdAndDelete method to return null (category not found)
    (CategoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const id = '1';
    if (!deleteCategory) return;

    await expect(deleteCategory({}, { id }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError('Category not found');
  });
});

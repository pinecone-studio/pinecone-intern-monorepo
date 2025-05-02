import { deleteCategory } from '../../../src/resolvers/mutations/delete-category';
import { categoryModel } from '../../../src/models/category.model';

jest.mock('../../../src/models/category.model');

describe('deleteCategory', () => {
  const mockFindByIdAndDelete = categoryModel.findByIdAndDelete as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete and return the category if it exists', async () => {
    const input = { _id: '123' };
    const mockCategory = { _id: '123', name: 'Sample Category' };

    mockFindByIdAndDelete.mockResolvedValue(mockCategory);

    const result = await deleteCategory(undefined, { input });

    expect(mockFindByIdAndDelete).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockCategory);
  });

  it('should throw an error if the category does not exist', async () => {
    const input = { _id: 'nonexistent' };

    mockFindByIdAndDelete.mockResolvedValue(null);

    await expect(deleteCategory(undefined, { input })).rejects.toThrow('Category not found.');

    expect(mockFindByIdAndDelete).toHaveBeenCalledWith('nonexistent');
  });

  it('should throw an error if an exception is thrown', async () => {
    const input = { _id: 'error-id' };
    mockFindByIdAndDelete.mockRejectedValue(new Error('Database failure'));

    await expect(deleteCategory(undefined, { input })).rejects.toThrow('Error deleting category: Database failure');

    expect(mockFindByIdAndDelete).toHaveBeenCalledWith('error-id');
  });
});

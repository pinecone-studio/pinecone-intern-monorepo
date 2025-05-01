import { deleteCategory } from '../../../src/resolvers/mutations/delete-category';
import { categoryModel } from '../../../src/models/category.model';

jest.mock('../../../src/models/category.model');
describe('deleteCategory', () => {
  const mockCategory = {
    _id: '123',
    name: 'Beverages',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should delete a category successfully', async () => {
    (categoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockCategory);
    const result = await deleteCategory(null, { _id: '123' });
    expect(result).toEqual(mockCategory);
    expect(categoryModel.findByIdAndDelete).toHaveBeenCalledWith('123');
  });
  it('should throw an error if _id is missing', async () => {
    await expect(deleteCategory(null, { _id: '' })).rejects.toThrow(/Category ID is required/);
  });
  it('should throw an error if category not found', async () => {
    (categoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
    await expect(deleteCategory(null, { _id: 'not-found' })).rejects.toThrow(/Category not found/);
  });
  it('should throw an error if deletion fails', async () => {
    (categoryModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(deleteCategory(null, { _id: '123' })).rejects.toThrow(/Error deleting category:/);
  });
});

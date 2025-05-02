import { updateCategory } from '../../../src/resolvers/mutations/update-category';
import { categoryModel } from '../../../src/models/category.model';

jest.mock('../../../src/models/category.model');

describe('updateCategory', () => {
  const mockCategory = {
    _id: '123',
    name: 'Updated Category',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update a category', async () => {
    (categoryModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockCategory);

    const input = { _id: '123', name: 'Updated Category' };
    const result = await updateCategory(null, { input });

    expect(result).toEqual(mockCategory);
    expect(categoryModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated Category', updatedAt: expect.any(Date) }, { new: true });
  });

  it('should throw an error if category is not found', async () => {
    (categoryModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const input = { _id: '999', name: 'Non-existent Category' };
    await expect(updateCategory(null, { input })).rejects.toThrow('Category not found.');
  });

  it('should throw an error if update fails', async () => {
    (categoryModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('DB error'));

    const input = { _id: '123', name: 'Faulty Update' };
    await expect(updateCategory(null, { input })).rejects.toThrow(/Error updating category: DB error/);
  });
});

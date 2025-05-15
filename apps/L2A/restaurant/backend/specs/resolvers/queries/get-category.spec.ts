import { getCategoryById } from '../../../src/resolvers/queries';
import { categoryModel } from '../../../src/models/category.model';

jest.mock('../../../src/models/category.model');

describe('category resolver', () => {
  const mockCategory = { _id: '123', name: 'Test Category' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a category when found', async () => {
    (categoryModel.findById as jest.Mock).mockResolvedValue(mockCategory);

    const result = await getCategoryById(null, { id: '123' });
    expect(result).toEqual(mockCategory);
    expect(categoryModel.findById).toHaveBeenCalledWith('123');
  });

  it('should throw an error when category not found', async () => {
    (categoryModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getCategoryById(null, { id: '123' }))
      .rejects
      .toThrow('Category not found');
  });

  it('should throw an error when there is a DB error', async () => {
    (categoryModel.findById as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(getCategoryById(null, { id: '123' }))
      .rejects
      .toThrow('Error fetching category: Error: DB error');
  });
});
import { addCategory } from '../../../src/resolvers/mutations/add-category';
import { categoryModel } from '../../../src/models/category.model';

jest.mock('../../../src/models/category.model');

describe('addCategory', () => {
  const mockCreate = categoryModel.create as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create and return a new category', async () => {
    const input = { name: 'New Category' };
    const mockCategory = { _id: '123', name: 'New Category' };

    mockCreate.mockResolvedValue(mockCategory);

    const result = await addCategory(undefined, { input });

    expect(mockCreate).toHaveBeenCalledWith({ name: 'New Category' });
    expect(result).toEqual(mockCategory);
  });

  it('should throw an error if category creation fails', async () => {
    const input = { name: 'Fail Category' };
    const errorMessage = 'Database error';

    mockCreate.mockRejectedValue(new Error(errorMessage));

    await expect(addCategory(undefined, { input })).rejects.toThrow(`Error creating category: Error: ${errorMessage}`);

    expect(mockCreate).toHaveBeenCalledWith({ name: 'Fail Category' });
  });
});

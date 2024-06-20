import { createCategory } from '@/graphql/resolvers/mutations';
import { CategoryModel } from '@/models/category.model';

jest.mock('../../src/models/category.model');

describe('createCategory', () => {
  let consoleLogSpy: jest.SpyInstance;
  const categoryInput = { name: 'New Category' };

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    jest.clearAllMocks();
  });
  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should create a category successfully', async () => {
    const mockCategory = { id: '1', name: 'New Category' };
    (CategoryModel.create as jest.Mock).mockResolvedValue(mockCategory);

    const result = await createCategory(undefined, { categoryInput });

    expect(CategoryModel.create).toHaveBeenCalledWith(categoryInput);
    expect(result).toEqual(mockCategory);
  });

  it('Should handle errors during category creation', async () => {
    const errorMessage = 'Cannot create category';
    (CategoryModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await expect(createCategory(undefined, { categoryInput })).rejects.toThrow(errorMessage);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(consoleLogSpy).toHaveBeenCalledWith(errorMessage);
    }

    expect(CategoryModel.create).toHaveBeenCalledWith(categoryInput);
  });
});

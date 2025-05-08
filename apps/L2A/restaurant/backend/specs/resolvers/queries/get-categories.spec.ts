import { Categories } from '../../../src/resolvers/queries/get-categories-query';
import { categoryModel } from '../../../src/models/category.model';
jest.mock('../../../src/models/category.model');

describe('categories resolver - get all categories', () => {
  const mockCategories = [
    { _id: '1', name: 'Category One' },
    { _id: '2', name: 'Category Two' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all categories', async () => {
    (categoryModel.find as jest.Mock).mockResolvedValue(mockCategories);

    const result = await Categories();

    expect(categoryModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockCategories);
  });

  it('should throw an error if fetching fails', async () => {
    (categoryModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(Categories()).rejects.toThrow('Error fetching categories: Error: Database error');
  });
});

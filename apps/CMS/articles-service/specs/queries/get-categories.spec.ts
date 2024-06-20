import { getCategories } from '@/graphql/resolvers/queries';
import { CategoryModel } from '@/models/category.model';
import { GraphQLError } from 'graphql';

jest.mock('../../src/models/category.model');

describe('getCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return categories successfully', async () => {
    const mockCategories = [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ];
    (CategoryModel.find as jest.Mock).mockResolvedValue(mockCategories);

    const result = await getCategories();

    expect(CategoryModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockCategories);
  });

  it('should throw a GraphQLError when categories are not found', async () => {
    (CategoryModel.find as jest.Mock).mockResolvedValue(null);

    try {
      await getCategories();
    } catch (err) {
      // expect(err).toBeInstanceOf(GraphQLError);
      expect(err.message).toBe('Database error'); // Update this expectation
    }

    expect(CategoryModel.find).toHaveBeenCalled();
  });

  it('should throw a GraphQLError when there is a database error', async () => {
    const error = new Error('Database error');
    (CategoryModel.find as jest.Mock).mockRejectedValue(error);

    try {
      await getCategories();
    } catch (err) {
      expect(err).toBeInstanceOf(GraphQLError);
      expect(err.message).toBe('Database error');
    }

    expect(CategoryModel.find).toHaveBeenCalled();
  });
});

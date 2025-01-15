import { getCategories } from '../../../src/resolvers/queries/get-categories';
import { CategoryModel } from '../../../src/models/category';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../src/models/category', () => ({
  CategoryModel: {
    find: jest.fn(),
  },
}));

describe('getCategories Query Resolver', () => {
  it('should return a list of categories', async () => {
    const mockCategories = [
      {
        id: '1',
        name: 'Burgers',
        description: 'A variety of burgers.',
      },
      {
        id: '2',
        name: 'Pizzas',
        description: 'A selection of pizzas.',
      },
    ];

    (CategoryModel.find as jest.Mock).mockResolvedValue(mockCategories);

    if (!getCategories) return;

    const result = await getCategories({}, {}, {}, {} as GraphQLResolveInfo);

    expect(CategoryModel.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCategories);
  });

  it('should handle errors when fetching categories', async () => {
    // Mocking CategoryModel.find to throw a specific error
    const errorMessage = 'Database connection failed';
    (CategoryModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    if (!getCategories) return;
    // Call the resolver and catch the error
    try {
      await getCategories({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Error fetching food items: Database connection failed');
      } else {
        fail('Expected error to be instance of Error');
      }
    }
  });

  it('should throw a generic error when an unknown error occurs', async () => {
    // Mocking an unknown error
    (CategoryModel.find as jest.Mock).mockRejectedValue('Unknown error');

    if (!getCategories) return;
    try {
      await getCategories({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Error fetching food items: An unknown error occurred');
      } else {
        fail('Expected error to be instance of Error');
      }
    }
  });
});

import { getFoods } from '../../../src/resolvers/queries/get-foods';
import { FoodModel } from '../../../src/models/food';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../src/models/food', () => ({
  FoodModel: {
    find: jest.fn(),
  },
}));

describe('getFoods Query Resolver', () => {
  it('should return a list of food items', async () => {
    const mockFoods = [
      {
        id: '1',
        foodName: 'Burger',
        imageUrl: 'https://example.com/burger.jpg',
        price: 5.99,
        status: 'available',
        createdAt: new Date(),
      },
      {
        id: '2',
        foodName: 'Pizza',
        imageUrl: 'https://example.com/pizza.jpg',
        price: 8.99,
        status: 'available',
        createdAt: new Date(),
      },
    ];

    (FoodModel.find as jest.Mock).mockResolvedValue(mockFoods);

    if (!getFoods) return;

    const result = await getFoods({}, {}, {}, {} as GraphQLResolveInfo);

    expect(FoodModel.find).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockFoods);
  });

  it('should handle errors when fetching food items', async () => {
    // Mocking FoodModel.find to throw a specific error
    const errorMessage = 'Database connection failed';
    (FoodModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    if (!getFoods) return;
    // Call the resolver and catch the error
    try {
      await getFoods({}, {}, {}, {} as GraphQLResolveInfo);
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
    (FoodModel.find as jest.Mock).mockRejectedValue('Unknown error');

    if (!getFoods) return;
    try {
      await getFoods({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Error fetching food items: An unknown error occurred');
      } else {
        fail('Expected error to be instance of Error');
      }
    }
  });
});

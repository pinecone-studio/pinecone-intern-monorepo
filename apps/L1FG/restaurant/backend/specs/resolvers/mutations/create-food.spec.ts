// src/resolvers/food.test.ts

import { createFood } from '../../../src/resolvers/mutations/create-food';
import { FoodModel } from '../../../src/models/food';
import { GraphQLResolveInfo } from 'graphql';

// Mock the FoodModel.create method correctly
jest.mock('../../../src/models/food', () => ({
  FoodModel: {
    create: jest.fn(), // Mock the create method directly
    find: jest.fn(), // Mock the find method as well (optional for other tests)
  },
}));

describe('createFood Mutation Resolver', () => {
  it('should create a food item and return it', async () => {
    // Define the input for creating a food item
    const mockInput = {
      foodName: 'Burger',
      imageUrl: 'https://example.com/burger.jpg',
      price: 5.99,
      status: 'available',
      categoryId: '123', // Assuming categoryId is optional, it can be null or a valid ID
    };

    // Mock the returned saved food item
    const mockSavedFood = {
      id: '123',
      ...mockInput,
      createdAt: new Date(), // Mock createdAt since it's generated automatically by mongoose
    };

    // Mock FoodModel.create to return the mockSavedFood
    (FoodModel.create as jest.Mock).mockResolvedValue(mockSavedFood);

    if (!createFood) return;
    // Call the resolver
    const result = await createFood({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    // Check that FoodModel.create was called with the correct input
    expect(FoodModel.create).toHaveBeenCalledWith(mockInput);

    // Check that the result is the expected saved food item
    expect(result).toEqual(mockSavedFood);
  });
});

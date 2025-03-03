import { FoodModel } from '../../../../src/models';
import { Response } from '../../../../src/generated';
import { deleteFoodCategory } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models'); // Mock the FoodModel

describe('deleteFoodCategory', () => {
  it('should return Failure if food item is not found', async () => {
    // Mock FoodModel.findById to return null (food not found)
    FoodModel.findById = jest.fn().mockResolvedValue(null);

    if (!deleteFoodCategory) return;

    const response = await deleteFoodCategory({}, { input: { id: '1' } }, {}, {} as GraphQLResolveInfo);

    expect(response.status).toBe(Response.Failure);
    expect(response.message).toBe('Food item not found');
  });

  it('should return Success if categoryId is removed successfully', async () => {
    const mockFood = {
      categoryId: '123',
      save: jest.fn().mockResolvedValue(true),
    };

    // Mock FoodModel.findById to return a mock food item
    FoodModel.findById = jest.fn().mockResolvedValue(mockFood);

    if (!deleteFoodCategory) return;

    const response = await deleteFoodCategory({}, { input: { id: '1' } }, {}, {} as GraphQLResolveInfo);

    expect(response.status).toBe(Response.Success);
    expect(response.message).toBe('Food item categoryId removed successfully');
    expect(mockFood.categoryId).toBeNull(); // Ensure categoryId is nullified
    expect(mockFood.save).toHaveBeenCalled(); // Ensure save was called
  });
});

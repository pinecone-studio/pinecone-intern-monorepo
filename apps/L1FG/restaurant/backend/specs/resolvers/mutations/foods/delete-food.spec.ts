import { Response } from '../../../../src/generated';
import { FoodModel } from '../../../../src/models';
import { deleteFood } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models/food', () => ({
  FoodModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('deleteFood Mutation', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully delete food when valid ID is provided', async () => {
    // Mock successful deletion
    const mockDeletedFood = {
      _id: 'food123',
      name: 'Pizza',
      description: 'Italian dish',
    };

    (FoodModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedFood);
    if (!deleteFood) return;
    const result = await deleteFood({}, { foodId: 'food123' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      status: Response.Success,
      message: 'Food deleted successfully',
    });
    expect(FoodModel.findByIdAndDelete).toHaveBeenCalledWith('food123');
    expect(FoodModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });

  it('should return failure when food is not found', async () => {
    // Mock food not found
    (FoodModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
    if (!deleteFood) return;
    const result = await deleteFood({}, { foodId: 'nonexistent123' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      status: Response.Failure,
      message: 'Food not found',
    });
    expect(FoodModel.findByIdAndDelete).toHaveBeenCalledWith('nonexistent123');
    expect(FoodModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });

  it('should handle database errors gracefully', async () => {
    // Mock database error
    (FoodModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Database error'));
    if (!deleteFood) return;
    const result = await deleteFood({}, { foodId: 'food123' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      status: Response.Failure,
      message: 'Failed to delete food',
    });
    expect(FoodModel.findByIdAndDelete).toHaveBeenCalledWith('food123');
    expect(FoodModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });
});

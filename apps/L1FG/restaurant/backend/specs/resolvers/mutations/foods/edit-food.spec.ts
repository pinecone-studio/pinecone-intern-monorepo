import { FoodModel } from 'apps/L1FG/restaurant/backend/src/models';
import { updateFood } from 'apps/L1FG/restaurant/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models/food', () => ({
  FoodModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('updateFood resolver', () => {
  it('should update the food item and return the updated document', async () => {
    // Mock food item before update
    const mockFood = {
      id: '65b1a7f5e3b2c123456789ab',
      foodName: 'Burger',
      imageUrl: 'https://example.com/burger.jpg',
      price: 9.99,
      status: 'Available',
      categoryId: '65b1a8cde3b2c123456789cd',
    };

    // Mock updated food item
    const updatedFood = {
      ...mockFood,
      foodName: 'Cheese Burger',
      price: 10.99,
    };

    // Mock Mongoose `findByIdAndUpdate`
    (FoodModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFood);

    if (!updateFood) return;

    const result = await updateFood({}, { input: { foodId: mockFood.id, foodName: 'Cheese Burger', price: 10.99 } }, {}, {} as GraphQLResolveInfo);

    expect(FoodModel.findByIdAndUpdate).toHaveBeenCalledWith(mockFood.id, { foodName: 'Cheese Burger', price: 10.99 }, { new: true });

    expect(result).toEqual(updatedFood);
  });

  it('should throw an error if update operation fails', async () => {
    (FoodModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Database error'));
    if (!updateFood) return;
    await expect(updateFood({}, { input: { foodId: '65b1a7f5e3b2c123456789ab', foodName: 'Pizza' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to edit food');
  });
});

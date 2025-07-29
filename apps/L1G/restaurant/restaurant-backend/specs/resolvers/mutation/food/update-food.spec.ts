import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { updateFood } from 'src/resolvers/mutations';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      foodId: '2',
      foodName: 'Test',
      price: '20000',
      image: 'image.jpg',
      status: 'active',
    }),
  },
}));

describe('updateFood', () => {
  it('should update a food', async () => {
    const result = await updateFood?.(
      {},
      {
        foodId: '2',
        input: {
          foodName: 'Test',
          price: '20000',
          image: 'image.jpg',
          status: 'active',
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual({
      foodId: '2',
      foodName: 'Test',
      price: '20000',
      image: 'image.jpg',
      status: 'active',
    });
  });
  it("should throw an error if the food doesn't exist", async () => {
    (FoodModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateFood?.({}, { foodId: '3', input: { foodName: 'Test', price: '20000', image: 'image.jpg', status: 'active' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      'Food with ID 3 is not found'
    );

    expect(FoodModel.findByIdAndUpdate).toHaveBeenCalledWith('3', { $set: { foodName: 'Test', price: '20000', image: 'image.jpg', status: 'active' } }, { new: true, runValidators: true });
  });
});

import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { updateFoodByStatus } from 'src/resolvers/mutations/food/update-food-by-status';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        foodId: '2',
        foodName: 'Test',
        price: '10',
        image: 'image.jpg',
        foodStatus: 'Идэвхигүй',
        category: {
          _id: '1',
          categoryName: 'Test1',
        },
        discount: {
          _id: '1',
          discountName: 'Test1',
          discountRate: 0.15,
        },
      }),
    }),
  },
}));

describe('updateFoodByStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should update food status', async () => {
    const result = await updateFoodByStatus?.(
      {},
      {
        foodId: '2',
        foodStatus: 'Идэвхигүй',
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual(
      expect.objectContaining({
        foodId: '2',
        foodName: 'Test',
      })
    );
  });

  it("should throw an error if the food doesn't exist", async () => {
    (FoodModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });
    await expect(
      updateFoodByStatus?.(
        {},
        {
          foodId: '3',
          foodStatus: 'Идэвхигүй',
        },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Food with ID 3 not found');
    expect(FoodModel.findByIdAndUpdate).toHaveBeenCalledWith('3', { foodStatus: 'Идэвхигүй' }, { new: true, runValidators: true });
  });
});

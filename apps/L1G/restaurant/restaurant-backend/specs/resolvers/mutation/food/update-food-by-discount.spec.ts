import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { updateFoodByDiscount } from 'src/resolvers/mutations';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue({
          _id: '2',
          foodName: 'Test',
          price: '10',
          image: 'image.jpg',
          status: 'Идэвхитэй',
          category: {
            _id: '1',
            categoryName: 'Test1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          discount: {
            _id: '1',
            discountName: 'Test1',
            discountRate: 0.15,
            startDate: Date.now(),
            endDate: Date.now(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      })),
    }),
  },
}));

describe('updateFoodByDiscount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should update food', async () => {
    const result = await updateFoodByDiscount?.(
      {},
      {
        foodId: '2',
        discountId: '2',
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
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue(null),
      })),
    });
    await expect(
      updateFoodByDiscount?.(
        {},
        {
          foodId: '3',
          discountId: '2',
        },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Food with ID 3 not found');
    expect(FoodModel.findByIdAndUpdate).toHaveBeenCalledWith('3', { discount: '2' }, { new: true, runValidators: true });
  });
});

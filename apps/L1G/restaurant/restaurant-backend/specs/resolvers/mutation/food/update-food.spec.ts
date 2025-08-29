import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { updateFood } from 'src/resolvers/mutations';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        foodId: '2',
        foodName: 'Test',
        price: '10',
        image: 'image.jpg',
        foodStatus: 'Идэвхитэй',
        category: {
          _id: '1',
          categoryName: 'Test1',
        },
      }),
    }),
  },
}));

describe('updateFood', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should update food', async () => {
    const result = await updateFood?.(
      {},
      {
        foodId: '2',
        input: {
          foodName: 'Test',
          price: '20',
          image: 'image.jpg',
          foodStatus: 'Идэвхитэй',
          categoryId: '1',
        },
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
      updateFood?.(
        {},
        {
          foodId: '3',
          input: {
            foodName: 'Test',
            price: '20',
            image: 'image.jpg',
            foodStatus: 'Идэвхитэй',
            categoryId: '1',
          },
        },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Food with ID 3 not found');
    expect(FoodModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '3',
      { $set: { foodName: 'Test', price: '20', image: 'image.jpg', foodStatus: 'Идэвхитэй', categoryId: '1' } },
      { new: true, runValidators: true }
    );
  });
});

import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { getFoodById } from 'src/resolvers/queries';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findById: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        _id: '2',
        foodName: 'Test',
        price: '10',
        image: 'image.jpg',
        status: 'Идэвхитэй',
        category: {
          _id: '1',
          categoryName: 'Test1',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    }),
  },
}));

describe('getFoodsById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return food', async () => {
    const result = await getFoodById?.({}, { foodId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        foodId: '2',
        foodName: 'Test',
      })
    );
  });

  it("should throw an error if the food doesn't exist", async () => {
    (FoodModel.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });
    await expect(getFoodById?.({}, { foodId: '3' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Food with ID 3 not found');
    expect(FoodModel.findById).toHaveBeenCalledWith('3');
  });
});

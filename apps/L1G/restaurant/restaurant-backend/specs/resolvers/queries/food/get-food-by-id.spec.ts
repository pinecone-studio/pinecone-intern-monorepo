import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { getFoodById } from 'src/resolvers/queries';

Date.now = jest.fn(() => 1487076708000);

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findById: jest.fn().mockReturnValue({
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue({
          _id: '2',
          foodName: 'Test2',
          price: '10',
          image: 'image.jpg',
          status: 'Идэвхитэй',
          category: {
            _id: '1',
            categoryName: 'Test2',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          discount: {
            _id: '1',
            discountName: 'Test2',
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

describe('getFoodsById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return food', async () => {
    const result = await getFoodById?.({}, { foodId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        foodId: '2',
        foodName: 'Test2',
      })
    );
  });

  it("should throw an error if the food doesn't exist", async () => {
    (FoodModel.findById as jest.Mock).mockReturnValue({
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue(null),
      })),
    });
    await expect(getFoodById?.({}, { foodId: '3' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Food with ID 3 not found');
    expect(FoodModel.findById).toHaveBeenCalledWith('3');
  });
});

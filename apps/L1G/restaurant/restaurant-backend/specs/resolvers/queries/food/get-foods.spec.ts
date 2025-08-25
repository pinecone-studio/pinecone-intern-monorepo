import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { getFoods } from 'src/resolvers/queries';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue([
          {
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
          },
        ]),
      })),
    }),
  },
}));

describe('getFoods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return foods', async () => {
    const result = await getFoods?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      expect.objectContaining({
        foodId: '2',
        foodName: 'Test',
      }),
    ]);
  });

  it('should handle database errors', async () => {
    (FoodModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn(() => ({
        populate: jest.fn().mockRejectedValue(new Error('Failed to fetch foods')),
      })),
    });
    await expect(getFoods?.({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to fetch foods');
  });
});

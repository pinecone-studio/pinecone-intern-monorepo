import { GraphQLResolveInfo } from 'graphql';
import { getFoods } from 'src/resolvers/queries';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    find: jest
      .fn()
      .mockReturnValueOnce({
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
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockRejectedValue(new Error('Failed to fetch foods')),
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
    await expect(getFoods?.({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to fetch foods');
  });
});

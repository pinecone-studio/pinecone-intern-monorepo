import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { getFoodsByStatus } from 'src/resolvers/queries';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([
        {
          foodId: '2',
          foodName: 'Test2',
          price: '10',
          image: 'image.jpg',
          foodStatus: 'Идэвхитэй',
          category: {
            _id: '1',
            categoryName: 'Test2',
          },
          discount: {
            _id: '1',
            discountName: 'Test2',
            discountRate: 0.15,
          },
        },
      ]),
    }),
  },
}));

describe('getFoodsByStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return foods', async () => {
    const result = await getFoodsByStatus?.({}, { foodStatus: 'Идэвхитэй' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining([
        {
          foodId: '2',
          foodName: 'Test2',
          price: '10',
          image: 'image.jpg',
          foodStatus: 'Идэвхитэй',
          category: {
            _id: '1',
            categoryName: 'Test2',
          },
          discount: {
            _id: '1',
            discountName: 'Test2',
            discountRate: 0.15,
          },
        },
      ])
    );
  });

  it('should handle database errors', async () => {
    (FoodModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error('Failed to fetch foods')),
    });
    await expect(getFoodsByStatus?.({}, { foodStatus: 'Идэвхитэй' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to fetch foods');
  });
});

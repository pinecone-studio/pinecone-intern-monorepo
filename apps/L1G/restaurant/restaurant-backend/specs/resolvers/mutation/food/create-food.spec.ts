import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { createFood } from 'src/resolvers/mutations';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    create: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        foodId: '2',
        foodName: 'Test',
        price: '20',
        image: 'image.jpg',
        foodStatus: 'Идэвхитэй',
        category: {
          categoryId: '1',
          categoryName: 'Test1',
        },
      }),
    }),
  },
}));

describe('createFood', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should create new food', async () => {
    const result = await createFood?.({}, { input: { foodName: 'Test', price: '20', image: 'image.jpg', foodStatus: 'Идэвхитэй', categoryId: '1' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        foodId: '2',
        foodName: 'Test',
      })
    );
  });

  it('should handle database errors', async () => {
    (FoodModel.create as jest.Mock).mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error('Failed to create food')),
    });
    await expect(createFood?.({}, { input: { foodName: 'Test', price: '20', image: 'image.jpg', foodStatus: 'Идэвхитэй', categoryId: '1' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      'Failed to create food'
    );
  });
});

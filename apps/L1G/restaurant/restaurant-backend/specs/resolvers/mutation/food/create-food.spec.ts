import { GraphQLResolveInfo } from 'graphql';
import { createFood } from 'src/resolvers/mutations';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockResolvedValue({
          _id: '2',
          foodName: 'Test',
          price: '20',
          image: 'image.jpg',
          status: 'Идэвхитэй',
          category: {
            _id: '1',
            categoryName: 'Test1',
          },
        }),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockRejectedValue(new Error('Failed to create food')),
      }),
  },
}));

describe('createFood', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should create new food', async () => {
    const result = await createFood?.({}, { input: { foodName: 'Test', price: '20', image: 'image.jpg', status: 'Идэвхитэй', categoryId: '1' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        foodId: '2',
        foodName: 'Test',
      })
    );
  });

  it('should handle database errors', async () => {
    await expect(createFood?.({}, { input: { foodName: 'Test', price: '20', image: 'image.jpg', status: 'Идэвхитэй', categoryId: '1' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      'Failed to create food'
    );
  });
});

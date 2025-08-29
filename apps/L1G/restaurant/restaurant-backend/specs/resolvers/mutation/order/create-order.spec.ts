import { GraphQLResolveInfo } from 'graphql';
import { FoodOrderModel } from 'src/models/order.model';
import { createFoodOrder } from 'src/resolvers/mutations';

jest.mock('src/models/order.model', () => ({
  FoodOrderModel: {
    create: jest.fn().mockResolvedValue({
      orderId: '123',
      orderNumber: 45678,
      status: 'PENDING',
      totalPrice: 1500,
      user: { userId: '1', username: 'Alice' },
      table: { tableId: '1', tableName: 'Table 1' },
      foodOrder: [
        {
          quantity: 2,
          food: {
            foodId: '1',
            foodName: 'Burger',
            price: 500,
            category: { categoryId: '1', categoryName: 'Food' },
          },
        },
      ],

      populate: jest.fn().mockImplementation(function () {
        return Promise.resolve(this);
      }),
    }),
  },
}));

describe('createFoodOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new order', async () => {
    const input = {
      totalPrice: 1500,
      status: 'PENDING',
      user: '1',
      table: '1',
      FoodOrderItem: [{ foodId: '1', quantity: 2 }],
    };

    const result = await createFoodOrder({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(
      expect.objectContaining({
        orderId: '123',
        orderNumber: 45678,
        status: 'PENDING',
        totalPrice: 1500,
        user: expect.objectContaining({ userId: '1', username: 'Alice' }),
        table: expect.objectContaining({ tableId: '1', tableName: 'Table 1' }),
        foodOrder: expect.arrayContaining([
          expect.objectContaining({
            quantity: 2,
            food: expect.objectContaining({ foodId: '1', foodName: 'Burger' }),
          }),
        ]),
      })
    );
  });

  it('should handle database errors', async () => {
    (FoodOrderModel.create as jest.Mock).mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error('Failed to create order')),
    });

    const input = {
      totalPrice: 1500,
      status: 'PENDING',
      user: '1',
      table: '1',
      FoodOrderItem: [{ foodId: '1', quantity: 2 }],
    };

    await expect(createFoodOrder({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to create order');
  });
});

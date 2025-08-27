import { GraphQLResolveInfo } from 'graphql';
import { getFoodOrders } from 'src/resolvers/queries';
jest.mock('src/models/order.model', () => ({
  FoodOrderModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue([
          {
            orderId: 'test',
            user: { userId: 'test', username: 'test' },
            table: { tableId: 'test', tableName: 'Table 1' },
            foodOrder: [
              {
                quantity: 5,
                food: {
                  foodId: 'test',
                  category: { categoryId: 'test', categoryName: 'Food' },
                  discount: { discountId: 'test', discountName: 'Promo' },
                },
              },
              {
                quantity: 2,
                food: {
                  foodId: 'test',
                  category: { categoryId: 'test', categoryName: 'Food' },
                  discount: { discountId: 'test', discountName: 'Promo' },
                },
              },
            ],
          },
        ]),
      }),
    }),
  },
}));

describe('Get Orders', () => {
  it('should return a Orders', async () => {
    const result = await getFoodOrders?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        orderId: 'test',
        user: { userId: 'test', username: 'test' },
        table: { tableId: 'test', tableName: 'Table 1' },
        foodOrder: [
          {
            quantity: 5,
            food: {
              foodId: 'test',
              category: { categoryId: 'test', categoryName: 'Food' },
              discount: { discountId: 'test', discountName: 'Promo' },
            },
          },
          {
            quantity: 2,
            food: {
              foodId: 'test',
              category: { categoryId: 'test', categoryName: 'Food' },
              discount: { discountId: 'test', discountName: 'Promo' },
            },
          },
        ],
      },
    ]);
  });
});

import { GraphQLResolveInfo } from 'graphql';
import { FoodOrderModel } from 'src/models/order.model';
import { getFoodOrdersByUser } from 'src/resolvers/queries';
jest.mock('src/models/order.model', () => ({
  FoodOrderModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue([
          {
            orderId: 'test-order-1',
            user: {
              userId: 'test-user-1',
              username: 'TestUser',
            },
            table: {
              tableId: 'test-table-1',
              tableName: 'Test Table 1',
            },
            foodOrder: [
              {
                quantity: 5,
                food: {
                  foodId: 'test-food-1',
                  foodName: 'Test Burger',
                  category: {
                    categoryId: 'test-category-1',
                    categoryName: 'Fast Food',
                  },
                  discount: {
                    discountId: 'test-discount-1',
                    discountName: 'Promo10',
                  },
                },
              },
              {
                quantity: 2,
                food: {
                  foodId: 'test-food-2',
                  foodName: 'Test Pizza',
                  category: {
                    categoryId: 'test-category-1',
                    categoryName: 'Fast Food',
                  },
                  discount: {
                    discountId: 'test-discount-1',
                    discountName: 'Promo10',
                  },
                },
              },
            ],
          },
        ]),
      }),
    }),
  },
}));

describe('getOrdersByUserId', () => {
  it('should return orders', async () => {
    const result = await getFoodOrdersByUser?.({}, { input: { userId: '1' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        orderId: 'test-order-1',
        user: {
          userId: 'test-user-1',
          username: 'TestUser',
        },
        table: {
          tableId: 'test-table-1',
          tableName: 'Test Table 1',
        },
        foodOrder: [
          {
            quantity: 5,
            food: {
              foodId: 'test-food-1',
              foodName: 'Test Burger',
              category: {
                categoryId: 'test-category-1',
                categoryName: 'Fast Food',
              },
              discount: {
                discountId: 'test-discount-1',
                discountName: 'Promo10',
              },
            },
          },
          {
            quantity: 2,
            food: {
              foodId: 'test-food-2',
              foodName: 'Test Pizza',
              category: {
                categoryId: 'test-category-1',
                categoryName: 'Fast Food',
              },
              discount: {
                discountId: 'test-discount-1',
                discountName: 'Promo10',
              },
            },
          },
        ],
      },
    ]);
  });

  it("should throw an error if the food doesn't exist", async () => {
    (FoodOrderModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      }),
    });
    await expect(getFoodOrdersByUser?.({}, { input: { userId: '1' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('order with userId : 1 not found');
    expect(FoodOrderModel.find).toHaveBeenCalledWith({ user: '1' });
  });
});

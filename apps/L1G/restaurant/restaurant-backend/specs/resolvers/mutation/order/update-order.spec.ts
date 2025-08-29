import { GraphQLResolveInfo } from 'graphql';
import { FoodOrderStatus } from 'src/generated';
import { updateFoodOrderStatus } from 'src/resolvers/mutations';

jest.mock('src/models/order.model', () => ({
  FoodOrderModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValue({
        orderId: '1',
        orderNumber: 1,
        status: 'DONE' as FoodOrderStatus.Done,
      })
      .mockReturnValueOnce(null),
  },
}));

describe('updateOrder', () => {
  it('should throw error if order does not exist', async () => {
    await expect(updateFoodOrderStatus?.({}, { input: { orderId: '1', status: 'DONE' as FoodOrderStatus.Done } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Order with ID 1 not found');
  });

  it('should update table', async () => {
    const result = await updateFoodOrderStatus?.({}, { input: { orderId: '1', status: 'DONE' as FoodOrderStatus.Done } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      orderId: '1',
      orderNumber: 1,
      status: 'DONE' as FoodOrderStatus.Done,
    });
  });
});

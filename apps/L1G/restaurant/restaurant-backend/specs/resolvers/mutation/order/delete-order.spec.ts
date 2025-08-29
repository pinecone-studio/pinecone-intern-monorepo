import { GraphQLResolveInfo } from 'graphql';
import { deleteFoodOrder } from 'src/resolvers/mutations';

jest.mock('src/models/order.model', () => ({
  FoodOrderModel: {
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        orderId: '2',
        orderNumber: 71810,
      })
      .mockReturnValueOnce(null),
  },
}));

describe('deleteOrder', () => {
  it('should delete order', async () => {
    const result = await deleteFoodOrder?.({}, { input: { orderId: '2' } }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(
      expect.objectContaining({
        orderId: '2',
        orderNumber: 71810,
      })
    );
  });
  it("should throw an error if the order doesn't exist", async () => {
    try {
      await deleteFoodOrder?.({}, { input: { orderId: '2' } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Order with ID 2 not found'));
    }
  });
});

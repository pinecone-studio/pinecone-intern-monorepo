import { getOrders } from '../../../src/resolvers/queries/get-orders';
import { orderModel } from '../../../src/models/order.model';

jest.mock('../../../src/models/order.model');

describe('getOrders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return orders when found', async () => {
    const mockOrders = [
      {
        _id: '123',
        user: 'user123',
        products: [{ product: 'product123', quantity: 1 }],
      },
      {
        _id: '124',
        user: 'user124',
        products: [{ product: 'product124', quantity: 2 }],
      },
    ];

    (orderModel.find as jest.Mock).mockResolvedValue(mockOrders);

    const result = await getOrders.getOrders();

    expect(orderModel.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockOrders);
  });

  it('should return an empty array if no orders found', async () => {
    (orderModel.find as jest.Mock).mockResolvedValue([]);

    const result = await getOrders.getOrders();

    expect(result).toEqual([]);
  });

  it('should throw error if DB error occurs', async () => {
    (orderModel.find as jest.Mock).mockRejectedValue(new Error('DB failure'));

    await expect(getOrders.getOrders()).rejects.toThrow('Error fetching orders: Error: DB failure');
  });
});

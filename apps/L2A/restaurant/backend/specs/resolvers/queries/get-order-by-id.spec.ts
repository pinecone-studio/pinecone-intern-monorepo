import { getOrderById } from '../../../src/resolvers/queries/get-order-by-id';
import { orderModel } from '../../../src/models/order.model';

jest.mock('../../../src/models/order.model');

describe('getOrderById (without populate)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return order when found', async () => {
    const mockOrder = {
      _id: '123',
      user: 'user123',
      products: [{ product: 'product123', quantity: 1 }],
    };

    (orderModel.findById as jest.Mock).mockResolvedValue(mockOrder);

    const result = await getOrderById.getOrder(null, { id: '123' });

    expect(orderModel.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockOrder);
  });

  it('should throw error if order not found', async () => {
    (orderModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getOrderById.getOrder(null, { id: 'not-found' })).rejects.toThrow('Order not found');
  });

  it('should throw error if DB error occurs', async () => {
    (orderModel.findById as jest.Mock).mockRejectedValue(new Error('DB failure'));

    await expect(getOrderById.getOrder(null, { id: 'error-case' })).rejects.toThrow('Error fetching order: Error: DB failure');
  });
});

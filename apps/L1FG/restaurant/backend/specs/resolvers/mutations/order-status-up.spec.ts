import mongoose from 'mongoose';
import { updateOrderStatus } from '../../../src/resolvers/mutations';
import { OrderModel } from '../../../src/models';
import { GraphQLResolveInfo } from 'graphql';

// Mock Mongoose methods
jest.mock('../../../src/models', () => ({
  OrderModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('updateOrderStatus Resolver', () => {
  const mockOrder = {
    _id: new mongoose.Types.ObjectId().toString(),
    status: 'Completed',
    tableId: 1,
    isRead: false,
    createdAt: new Date(),
    items: [],
  };

  it('should update order status successfully', async () => {
    // Mock DB response
    (OrderModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockOrder);

    if (!updateOrderStatus) return;

    const result = await updateOrderStatus({}, { orderId: mockOrder._id, status: 'Completed' }, {}, {} as GraphQLResolveInfo);

    expect(OrderModel.findByIdAndUpdate).toHaveBeenCalledWith(mockOrder._id, { status: 'Completed', isRead: false }, { new: true });

    expect(result).toEqual(mockOrder);
  });

  it('should throw an error if order not found', async () => {
    // Mock DB response for non-existent order
    (OrderModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    if (!updateOrderStatus) return;

    await expect(updateOrderStatus({}, { orderId: 'nonexistent-id', status: 'Cancelled' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Order not found');
  });
});

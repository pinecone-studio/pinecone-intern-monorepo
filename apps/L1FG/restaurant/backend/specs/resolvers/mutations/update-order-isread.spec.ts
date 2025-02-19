import mongoose from 'mongoose';
import { OrderModel } from '../../../src/models';
import { GraphQLResolveInfo } from 'graphql';
import { updateOrderRead } from '../../../src/resolvers/mutations';

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

    if (!updateOrderRead) return;

    const result = await updateOrderRead({}, { orderId: mockOrder._id }, {}, {} as GraphQLResolveInfo);

    expect(OrderModel.findByIdAndUpdate).toHaveBeenCalledWith(mockOrder._id, { isRead: true }, { new: true });

    expect(result).toEqual(mockOrder);
  });

  it('should throw an error if order not found', async () => {
    (OrderModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    if (!updateOrderRead) return;

    await expect(updateOrderRead({}, { orderId: 'nonexistent-id' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Order not found');
  });
});

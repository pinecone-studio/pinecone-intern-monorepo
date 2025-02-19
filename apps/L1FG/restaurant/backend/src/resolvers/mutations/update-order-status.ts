import { MutationResolvers } from '../../generated';
import { OrderModel } from '../../models';

export const updateOrderStatus: MutationResolvers['updateOrderStatus'] = async (_, { orderId, status }) => {
  const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, { status, isRead: false }, { new: true });

  if (!updatedOrder) {
    throw new Error('Order not found');
  }

  return updatedOrder;
};

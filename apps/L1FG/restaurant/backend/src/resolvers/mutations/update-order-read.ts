import { MutationResolvers } from '../../generated';
import { OrderModel } from '../../models';

export const updateOrderRead: MutationResolvers['updateOrderRead'] = async (_, { orderId }) => {
  const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, { isRead: true }, { new: true });

  if (!updatedOrder) {
    throw new Error('Order not found');
  }

  return updatedOrder;
};

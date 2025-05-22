import { orderModel } from '../../models/order.model';

export const getOrderById = {
  getOrder: async (_: unknown, { id }: { id: string }) => {
    try {
      const order = await orderModel.findById(id);
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (error) {
      throw new Error(`Error fetching order: ${error}`);
    }
  },
};

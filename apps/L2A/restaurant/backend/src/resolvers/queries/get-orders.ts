import { orderModel } from '../../models/order.model';

export const getOrders = {
  getOrders: async () => {
    try {
      return await orderModel.find();
    } catch (error) {
      throw new Error(`Error fetching orders: ${error}`);
    }
  },
};

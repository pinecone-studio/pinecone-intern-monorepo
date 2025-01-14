import { QueryResolvers } from '../../generated';
import { OrderModel } from '../../models/order';

export const getOrders: QueryResolvers['getOrders'] = async (_, { tableId }) => {
  const orders = tableId ? await OrderModel.find({ tableId }) : await OrderModel.find({});

  return orders.map((order) => ({
    _id: order._id.toString(),
    items: order.items,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    tableId: order.tableId,
  }));
};

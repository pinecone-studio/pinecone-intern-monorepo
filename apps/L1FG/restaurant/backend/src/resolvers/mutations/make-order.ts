import { MutationResolvers } from '../../generated';
import { OrderModel } from '../../models/order';

export const makeOrder: MutationResolvers['makeOrder'] = async (_, { input }) => {
  const { tableId, items } = input;

  const savedOrder = await OrderModel.create({
    tableId,
    items,
    status: 'Pending',
    createdAt: new Date(),
  });

  return {
    _id: savedOrder._id.toString(),
    items: savedOrder.items,
    createdAt: savedOrder.createdAt,
    status: savedOrder.status,
    tableId: savedOrder.tableId,
  };
};

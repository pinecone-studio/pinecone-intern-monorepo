import { QueryResolvers } from '../../generated';
import { OrderModel } from '../../models/order';

export const getOrdersForUser: QueryResolvers['getOrdersForUser'] = async (_, { userId }) => {
  const orders = await OrderModel.find({ userId });

  return orders;
};

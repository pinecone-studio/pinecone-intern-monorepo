import { QueryResolvers } from '../../../generated';
import { OrderModel } from '../../../models';

export const getOrders: QueryResolvers['getOrders'] = async () => {
  const orders = await OrderModel.find();
  return orders;
};

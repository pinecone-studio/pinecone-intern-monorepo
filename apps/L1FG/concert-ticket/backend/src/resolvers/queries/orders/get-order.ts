import { QueryResolvers } from '../../../generated';
import { OrderModel } from '../../../models';

export const getOrder: QueryResolvers['getOrder'] = async (_: unknown, { userID }) => {
  const order = await OrderModel.find({ userID: userID });
  if (!order) throw new Error('Захиалга байхгүй байна');
  return order;
};

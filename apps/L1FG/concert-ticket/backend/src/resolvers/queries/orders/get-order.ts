import { QueryResolvers } from '../../../generated';
import { OrderModel } from '../../../models';

export const getOrder: QueryResolvers['getOrder'] = async (_: unknown, { userID }) => {
  const order = await OrderModel.findOne({ userID });
  if (!order) throw new Error('zahialga baihgvi baina');
  return order;
};

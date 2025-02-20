import { DeleteOrderReqModel } from 'apps/L1FG/concert-ticket/backend/src/models';
import { QueryResolvers } from '../../../generated';

export const getDeleteOrderId: QueryResolvers['getDeleteOrderId'] = async (_: unknown, { orderId }) => {
  const orderDeleteReq = await DeleteOrderReqModel.findOne({ orderId: orderId });

  if (!orderDeleteReq) throw new Error('Захиалга цуцлах хүсэлт байхгүй байна');

  return orderDeleteReq;
};

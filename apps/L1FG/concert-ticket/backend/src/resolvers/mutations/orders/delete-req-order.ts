import { MutationResolvers } from '../../../generated';
import { DeleteOrderReqModel } from '../../../models';

export const deleteReqDone: MutationResolvers['deleteReqDone'] = async (_: unknown, { orderReqId }) => {
  const orderReq = await DeleteOrderReqModel.findByIdAndDelete({ _id: orderReqId });
  return orderReq;
};

import { MutationResolvers } from '../../../generated';
import { OrderModel } from '../../../models';

export const deleteOrder: MutationResolvers['deleteOrder'] = async (_: unknown, { id }) => {
  const deletedOrder = await OrderModel.findByIdAndDelete({ _id: id });
  return deletedOrder;
};

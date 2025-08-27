import { MutationResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';

export const deleteFoodOrder: MutationResolvers['deleteFoodOrder'] = async (_, { input: { orderId } }) => {
  const deletedOrder = await FoodOrderModel.findByIdAndDelete(orderId);

  if (!deletedOrder) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  return deletedOrder;
};

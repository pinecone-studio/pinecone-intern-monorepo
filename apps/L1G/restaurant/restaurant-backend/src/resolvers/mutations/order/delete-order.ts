import { MutationResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';

export const deleteFoodOrder: MutationResolvers['deleteFoodOrder'] = async (_, { orderId }) => {
  const deletedOrder = await FoodOrderModel.findByIdAndDelete(orderId);

  if (!deletedOrder) {
    throw new Error(`Order with ${orderId} Id is not found`);
  }

  return {
    success: true,
    message: 'Order deleted successfully',
  };
};

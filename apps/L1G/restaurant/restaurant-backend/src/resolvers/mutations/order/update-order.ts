import { MutationResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';

export const updateFoodOrderStatus: MutationResolvers['updateFoodOrderStatus'] = async (_, { input: { orderId, status } }) => {
  const updatedOrder = await FoodOrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!updatedOrder) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  return updatedOrder;
};

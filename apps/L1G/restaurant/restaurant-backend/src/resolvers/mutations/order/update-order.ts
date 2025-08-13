import { MutationResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';

export const updateFoodOrder: MutationResolvers['updateFoodOrder'] = async (_, { orderId, input: { totalPrice, foodOrderItems, status } }) => {
  const updatedOrder = await FoodOrderModel.findByIdAndUpdate(orderId, { $set: { totalPrice, foodOrderItems, status } }, { new: true });

  await updatedOrder.populate([{ path: 'user' }, { path: 'foodOrderItems.food' }]);

  if (!updatedOrder) {
    throw new Error(`Order with ${orderId} Id is not found`);
  }

  return updatedOrder;
};

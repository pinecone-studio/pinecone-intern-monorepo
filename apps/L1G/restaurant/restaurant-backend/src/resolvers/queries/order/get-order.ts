import { QueryResolvers } from '../../../generated';
import { FoodOrderModel } from 'src/models/order.model';

export const getFoodOrderById: QueryResolvers['getFoodOrderById'] = async (_, { orderId }) => {
  const order = await FoodOrderModel.findById(orderId).populate([{ path: 'user' }, { path: 'foodOrderItems.food' }]);

  if (!order) {
    throw new Error(`Order with ${orderId} Id is not found`);
  }

  return order;
};

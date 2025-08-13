import { QueryResolvers } from '../../../generated';
import { FoodOrderModel } from 'src/models/order.model';

export const getFoodOrdersByUser: QueryResolvers['getFoodOrdersByUser'] = async (_, { userId }) => {
  const ordersByUser = await FoodOrderModel.find({ user: userId }).populate([{ path: 'user' }, { path: 'foodOrderItems.food' }]);

  if (!ordersByUser) {
    throw new Error(`Orders with ${userId} user Id is not found`);
  }

  return ordersByUser as any;
};

import { QueryResolvers } from '../../../generated';
import { FoodOrderModel } from 'src/models/order.model';

export const getFoodOrders: QueryResolvers['getFoodOrders'] = async () => {
  const orders = await FoodOrderModel.find().populate([{ path: 'user' }, { path: 'foodOrderItems.food' }]);

  if (!orders) {
    throw new Error(`There is no orders`);
  }

  return orders as any;
};

import { QueryResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';

export const getFoodOrdersByUser: QueryResolvers['getFoodOrdersByUser'] = async (_, { input: { userId } }) => {
  const orders = await FoodOrderModel.find({ user: userId })
    .populate(['user', 'table'])
    .populate({
      path: 'foodOrder.food',
      populate: ['category', 'discount'],
    });
  if (!orders) {
    throw new Error(`order with userId : ${userId} not found`);
  }
  return orders as any;
};

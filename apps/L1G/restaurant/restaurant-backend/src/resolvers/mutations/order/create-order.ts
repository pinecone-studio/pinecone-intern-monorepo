import { MutationResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';

export const createFoodOrder: MutationResolvers['createFoodOrder'] = async (_, { input: { user, totalPrice, foodOrderItems, status } }) => {
  const newOrder = await FoodOrderModel.create({ user, totalPrice, foodOrderItems, status });

  await newOrder.populate([{ path: 'user' }, { path: 'foodOrderItems.food' }]);

  if (!newOrder) {
    throw new Error(`Order with ${user} user Id is not found`);
  }

  return newOrder;
};

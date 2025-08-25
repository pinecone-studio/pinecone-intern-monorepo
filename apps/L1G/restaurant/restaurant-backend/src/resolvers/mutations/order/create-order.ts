import { MutationResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';

export const createFoodOrder: MutationResolvers['createFoodOrder'] = async (_, { userId, tableId, input: { foodOrderItems, totalPrice, status } }) => {
  const newOrder = await FoodOrderModel.create({
    user: userId,
    table: tableId,
    orderNumber: Math.floor(10000 + Math.random() * 90000),
    foodOrderItems,
    totalPrice,
    status: status || 'PENDING',
  });

  return newOrder;
};

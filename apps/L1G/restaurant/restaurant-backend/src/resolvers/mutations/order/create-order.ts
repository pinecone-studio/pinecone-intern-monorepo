import { MutationResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';

export const createFoodOrder: MutationResolvers['createFoodOrder'] = async (_, { input: { totalPrice, status, user, table, FoodOrderItem, orderType } }) => {
  try {
    const foodOrderMapped = FoodOrderItem.map(({ foodId, quantity }) => ({
      food: foodId,
      quantity,
    }));

    const newOrder = await FoodOrderModel.create({
      orderNumber: Math.floor(10000 + Math.random() * 90000),
      totalPrice,
      status,
      user,
      table,
      foodOrder: foodOrderMapped,
      orderType,
    });
    await newOrder.populate([{ path: 'user' }, { path: 'foodOrder.food' }, { path: 'table' }]);
    return newOrder;
  } catch (error) {
    throw new Error(`Failed to create order`);
  }
};

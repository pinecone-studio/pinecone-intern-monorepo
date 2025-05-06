import { MutationResolvers } from '../../generated';
import { orderModel } from '../../models/order.model';

export const createOrder: MutationResolvers['createOrder'] = async (_, { products, userId }) => {
  try {
    const order = await orderModel.create({
      user: userId,
      products,
    });
    return order;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
};

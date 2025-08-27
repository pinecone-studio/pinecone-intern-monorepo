import { QueryResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';

export const getFoodOrders: QueryResolvers['getFoodOrders'] = async () => {
  const foodOrders = (await FoodOrderModel.find()
    .populate(['table', 'user'])
    .populate({
      path: 'foodOrder.food',
      populate: [{ path: 'category' }, { path: 'discount' }],
    })) as any;

  return foodOrders;
};

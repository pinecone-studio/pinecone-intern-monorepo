import { MutationResolvers } from 'src/generated';
import { FoodOrderModel } from 'src/models/order.model';
import { UserModel } from 'src/models/user.model';

export const updateFoodOrderStatus: MutationResolvers['updateFoodOrderStatus'] = async (_, { input: { orderId, status } }) => {
  const currentOrder = await FoodOrderModel.findById(orderId);
  if (!currentOrder) {
    throw new Error(`Order with ID ${orderId} not found`);
  }
  const updatedOrder = await FoodOrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
  await updatedOrder.populate([{ path: 'user' }, { path: 'foodOrder.food' }, { path: 'table' }]);

  if (status === 'DONE' && currentOrder.status !== 'DONE' && !currentOrder.bonusPointsAwarded) {
    const bonusPoints = Math.floor(updatedOrder.totalPrice * 0.01);
    if (bonusPoints > 0) {
      await UserModel.findByIdAndUpdate(updatedOrder.user._id, { $inc: { bonusPoints: bonusPoints } }, { new: true });
      await FoodOrderModel.findByIdAndUpdate(orderId, { bonusPointsAwarded: true }, { new: true });
    }
  }

  return updatedOrder;
};

import { MutationResolvers } from '../../../generated';
import { OrderModel } from '../../../models';
import { DeleteOrderReqModel } from '../../../models/order-delete-req.model';

export const createDeleteReq: MutationResolvers['createDeleteReq'] = async (_: unknown, { input }) => {
  const { concertName, totalPrice, userName, accountNumber, bankName, orderId, reqStatus, orderStatus } = input;

  const order = await OrderModel.findById({ _id: orderId });

  const reservationDate = new Date(order.createdAt);

  const today = new Date(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Ulaanbaatar' }).format());

  const tiffDate = today.getTime() - reservationDate.getTime();

  if (tiffDate >= 86400000) {
    throw new Error('Тасалбар устгах хугацаа дууссан байна');
  }

  const createDeleteReq = await DeleteOrderReqModel.create({ concertName, totalPrice, userName, orderStatus, accountNumber, bankName, orderId, reqStatus });

  return createDeleteReq;
};

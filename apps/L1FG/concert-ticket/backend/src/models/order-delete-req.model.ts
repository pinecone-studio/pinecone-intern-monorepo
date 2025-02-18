import mongoose, { model, models, Schema } from 'mongoose';

const deleteOrderSchema = new Schema(
  {
    concertName: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    userName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    bankName: { type: String, required: true },
    orderId: { type: mongoose.Types.ObjectId, ref: 'order', required: true },
    reqStatus: { type: Boolean },
    orderStatus: { type: String, enum: ['CANCEL', 'DELETE'], default: 'CANCEL' },
  },
  { timestamps: true }
);
export const DeleteOrderReqModel = models['OrderDeleteReq'] || model('OrderDeleteReq', deleteOrderSchema);

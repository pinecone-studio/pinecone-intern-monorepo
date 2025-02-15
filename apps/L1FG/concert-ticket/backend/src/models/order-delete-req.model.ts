import mongoose, { model, models, Schema } from 'mongoose';

const deleteOrderSchema = new Schema(
  {
    concertName: { type: String },
    totalPrice: { type: Number },
    userName: { type: String },
    accountNumber: { type: Number },
    bankName: { type: String },
    orderId: { type: mongoose.Types.ObjectId, ref: 'order', required: true },
    reqStatus: { type: Boolean },
  },
  { timestamps: true }
);
export const DeleteOrderReqModel = models['OrderDeleteReq'] || model('OrderDeleteReq', deleteOrderSchema);

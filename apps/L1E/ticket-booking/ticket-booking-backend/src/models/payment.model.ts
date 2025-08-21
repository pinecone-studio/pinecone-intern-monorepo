import mongoose, { ObjectId, Schema, model, models } from 'mongoose';

export type PaymentType = {
  _id: ObjectId | string;
  orderId: ObjectId;
  provider: 'STRIPE' | 'PAYPAL';
  transactionId?: string;
  amount: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  paidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

const PaymentSchema = new Schema<PaymentType>(
  {
    orderId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Order', required: true },
    provider: { type: String, enum: ['STRIPE', 'PAYPAL'], required: true },
    transactionId: { type: String },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['SUCCESS', 'FAILED', 'PENDING'], default: 'PENDING' },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

export const Payment = models['Payment'] || model<PaymentType>('Payment', PaymentSchema);

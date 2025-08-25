import mongoose, { ObjectId, Schema, model, models } from 'mongoose';

export type PaymentType = {
  _id: ObjectId | string;
  ticketId: ObjectId; // Reference to Ticket
  amount: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  createdAt?: Date;
  updatedAt?: Date;
};

const PaymentSchema = new Schema<PaymentType>(
  {
    ticketId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Ticket', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['SUCCESS', 'FAILED', 'PENDING'], default: 'PENDING' },
  },
  { timestamps: true }
);

export const Payment = models['Payment'] || model<PaymentType>('Payment', PaymentSchema);

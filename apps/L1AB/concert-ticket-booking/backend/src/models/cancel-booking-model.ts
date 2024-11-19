import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';
import { EventType } from './event-model';

export type CancelType = {
  _id: string;
  eventId: Types.ObjectId;
  bankName: string;
  bankAccount: number;
  userId: Types.ObjectId;
  amountTotal: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

const CancelSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  bankAccount: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  amountTotal: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Шилжүүлээгүй',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
export type CancelPopulateType = CancelType & {
  userId: UserType;
  eventId: EventType;
};

export const cancelModel = models['cancel'] || model('cancel', CancelSchema);

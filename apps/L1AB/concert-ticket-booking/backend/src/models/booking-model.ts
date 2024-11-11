import { model, models, Schema, Types } from 'mongoose';

export type BookingType = {
  _id: string;
  user_id: Types.ObjectId;
  event_id: Types.ObjectId;
};

const BookingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  event_id: {
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
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
export const BookingModel = models['booking'] || model('booking', BookingSchema);

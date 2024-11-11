import { model, models, Schema, Types } from 'mongoose';

export type BookingType = {
  _id: string;
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
};

const BookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  eventId: {
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

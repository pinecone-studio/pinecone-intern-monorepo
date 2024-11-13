import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';
import { EventType } from './event-model';

export type BookingType = {
  _id: string;
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
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
  venues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'venues',
      required: true,
    },
  ],
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
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

export type BookingPopulatedType = BookingType & {
  user: UserType;
  event: EventType;
};

export const BookingModel = models['booking'] || model('booking', BookingSchema);

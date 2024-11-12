import { model, models, Schema, Types } from 'mongoose';
import { VenuesType } from './venue-model';

export type EventType = {
  _id: string;
  name: string;
  artistName: [string];
  description: string;
  eventDate: Date;
  eventTime: Date;
  images: [string];
  venues: [Types.ObjectId];
  discount: number;
  createdAt: Date;
  updatedAt: Date;
};

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  artistName: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: false,
  },
  eventTime: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  venues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'venues',
      required: true,
    },
  ],
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

export type EventPopulatedType = EventType & {
  venues: VenuesType;
};

export const EventModel = models['event'] || model('event', EventSchema);

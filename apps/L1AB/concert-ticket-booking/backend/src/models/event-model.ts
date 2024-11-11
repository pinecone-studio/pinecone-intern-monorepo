import { model, models, Schema, Types } from 'mongoose';

export type EventType = {
  _id: string;
  name: string;
  artistName: [string];
  description: string;
  startTime: Date;
  endTime: Date;
  images: [string];
  venues: [Types.ObjectId];
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
  startTime: {
    type: Date,
    required: false,
  },
  endTime: {
    type: Date,
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

export const EventModel = models['event'] || model('event', EventSchema);

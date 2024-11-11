import { model, models, Schema, Types } from 'mongoose';

export type EventType = {
  _id: string;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  venues: Types.ObjectId;
};

const EventSchema = new Schema({
  name: {
    type: String,
    description: String,
  },
  startTime: {
    type: Date,
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
  },
  venues: {
    type: Schema.Types.ObjectId,
    ref: 'venues',
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

export const EventModel = models['event'] || model('event', EventSchema);

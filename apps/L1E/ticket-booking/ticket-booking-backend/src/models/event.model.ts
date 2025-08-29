import mongoose, { ObjectId, Schema, model, models } from 'mongoose';

export type EventType = {
  _id: ObjectId | string;
  title: string;
  description?: string;
  location: string;
  date: Date;
  createdBy: ObjectId; 
  ticketTypes?: ObjectId[]; 
  createdAt?: Date;
  updatedAt?: Date;
};

const EventSchema = new Schema<EventType>(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    ticketTypes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'TicketType' }],
  },
  { timestamps: true }
);

export const Event = models['Event'] || model<EventType>('Event', EventSchema);

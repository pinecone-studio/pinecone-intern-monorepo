import { Schema, models, model } from 'mongoose';
import { RoomType } from '../types/common-types';

const RoomSchema = new Schema<RoomType>({
  hotelId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  roomNumber: { type: String, required: true },
  price: { type: Number, required: true },
  bed: { type: Number, required: true },
  images: { type: [String], required: true },
  roomInfo: { type: [String], required: true },
  type: { type: String, required: true },
  accessibility: { type: [String], required: true },
  bathroom: { type: [String], required: true },
  internet: { type: [String], required: true },
  foodAndDrink: { type: [String], required: true },
  bedroom: { type: [String], required: true },
  other: { type: [String], required: true },
  tax: { type: Number },
});

export const RoomModel = models['rooms'] || model<RoomType>('rooms', RoomSchema);

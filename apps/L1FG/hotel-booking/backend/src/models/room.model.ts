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
  roomServices: {
    type: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    default: [],
  },
  tax: { type: Number },
});

export const RoomModel = models['rooms'] || model<RoomType>('rooms', RoomSchema);

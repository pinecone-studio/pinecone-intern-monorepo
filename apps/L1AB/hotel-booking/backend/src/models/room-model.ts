import mongoose, { model, Schema, Types } from 'mongoose';
import { hotelType } from './hotel.model';

export type roomType = {
  _id: string;
  name: string;
  description: string;
  photos: string[];
  roomNumber: string;
  price: number;
  roomType: string;
  hotelId: Types.ObjectId;
  maxCapacity: number;
  createdAt: Date;
  updatedAt: Date;
};

const roomSchema = new Schema<roomType>(
  {
    maxCapacity: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photos: [
      {
        type: String,
      },
    ],
    roomType: {
      type: String,
      enum: ['ONE', 'TWO'],
      required: true,
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: 'hotel',
      required: true,
    },
  },
  { timestamps: true }
);

export type roomPopulatedType = roomType & {
  hotelId: hotelType;
};

export const roomModel = mongoose.models.room || model('room', roomSchema);

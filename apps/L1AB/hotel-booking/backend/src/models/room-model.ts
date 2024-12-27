import mongoose, { model, Schema, Types } from 'mongoose';
import { hotelType } from './hotel.model';
import { amenityType } from './amenity-model';

export type roomType = {
  _id: string;
  name: string;
  description: string;
  photos: string[];
  roomNumber: string;
  price: number;
  roomType: string;
  hotelId: Types.ObjectId;
  roomAmenities: Types.ObjectId;
  maxCapacity: number;
  createdAt: Date;
  updatedAt: Date;
};

const roomSchema = new Schema<roomType>(
  {
    maxCapacity: {
      type: Number,
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

    roomAmenities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'amenity',
      },
    ],
  },
  { timestamps: true }
);

export type roomPopulatedType = roomType & {
  hotelId: hotelType;
  roomAmenities: amenityType[];
};

export const roomModel = mongoose.models.room || model('room', roomSchema);

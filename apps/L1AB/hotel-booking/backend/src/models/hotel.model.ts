import mongoose, { model, Schema, Types } from 'mongoose';

export type hotelType = {
  _id: string;
  name: string;
  description: string;
  images: string[];
  address: string;
  phone: string;
  city: string;
  rating: number;
  stars: number;
  rooms: Types.ObjectId[];
  hotelAmenities: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const hotelSchema = new Schema<hotelType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
    },
    stars: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const hotelModel = mongoose.models.hotel || model('hotel', hotelSchema);

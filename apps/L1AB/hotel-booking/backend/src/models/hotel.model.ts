import mongoose, { model, Schema } from 'mongoose';

const hotelSchema = new Schema(
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
      required: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
    },
    stars: {
      type: Number,
    },
    rooms: [
      {
        type: Schema.ObjectId,
        ref: 'room',
      },
    ],
    hotelAmenity: {
      type: Schema.ObjectId,
      ref: 'hotelAmenity',
    },
  },
  { timestamps: true }
);

export const hotelModel = mongoose.models.hotel || model('hotel', hotelSchema);

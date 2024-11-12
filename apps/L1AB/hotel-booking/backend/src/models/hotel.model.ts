import mongoose, { model, Schema } from 'mongoose';

const hotelSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    images: [{ type: String }],
    address: { type: String },
    phone: { type: String },
    city: { type: String },
    rating: { type: Number },
    stars: { type: Number },
  },
  { timestamps: true }
);

export const hotelModel = mongoose.models.hotel || model('hotel', hotelSchema);

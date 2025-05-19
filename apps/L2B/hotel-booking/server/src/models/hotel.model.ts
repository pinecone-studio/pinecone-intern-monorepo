import { model, models, Schema } from 'mongoose';

const hotelSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    starRating: { type: Number, min: 1, max: 5 },
    description: { type: String, required: true },
    amenities: [String],
    phone: { type: String },
    email: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const hotelModel = models.Hotel || model('Hotel', hotelSchema);

import { model, models, Schema } from 'mongoose';

const hotelSchema = new Schema(
  {
    name: { type: String, trim: true, default: 'Hotel name' },
    location: { type: String, default: 'Hotel location' },
    starRating: { type: Number, min: 1, max: 5, default: 0 },
    rating: { type: Number, default: 0 },
    description: { type: String, default: 'Hotel description' },
    amenities: { type: [String], default: [] },
    phone: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const hotelModel = models.Hotel || model('Hotel', hotelSchema);

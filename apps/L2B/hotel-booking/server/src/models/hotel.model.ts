import { model, models, Schema } from 'mongoose';

const hotelSchema = new Schema(
  {
    name: { type: String, trim: true },
    location: { type: String },
    starRating: { type: Number, min: 1, max: 5 },
    rating: { type: Number },
    description: { type: String },
    amenities: [String],
    phone: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const hotelModel = models.Hotel || model('Hotel', hotelSchema);

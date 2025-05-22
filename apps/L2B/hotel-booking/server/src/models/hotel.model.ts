import { model, models, Schema } from 'mongoose';

const hotelSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    starRating: { type: Number, min: 1, max: 5 },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    amenities: [String],
    phone: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const hotelModel = models.Hotel || model('Hotel', hotelSchema);

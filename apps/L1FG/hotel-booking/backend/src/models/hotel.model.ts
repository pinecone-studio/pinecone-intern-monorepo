import { HotelType } from '../types/common-types';
import { Schema, models, model } from 'mongoose';

const HotelSchema = new Schema<HotelType>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  rating: { type: Number },
  starRating: { type: Number },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  rooms: { type: [Schema.Types.ObjectId], ref: 'rooms', default: [] },
  faqs: { type: [Map], of: String },
  policies: { type: [Map], of: String },
  about: { type: [Map], of: String },
  location: { type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true } },
  locationName: { type: String },
});

export const HotelModel = models['hotels'] || model<HotelType>('hotels', HotelSchema);

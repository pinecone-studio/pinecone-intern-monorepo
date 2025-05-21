import { model, models, Schema } from 'mongoose';

const roomSchema = new Schema(
  {
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['single', 'double', 'twin', 'suite', 'deluxe', 'family'],
      required: true,
    },
    pricePerNight: { type: Number, required: true },
    information: { type: String, required: true },
    services: [String],
    starRating: { type: Number, min: 1, max: 5 },
    maxOccupancy: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const roomModel = models.Room || model('Room', roomSchema);

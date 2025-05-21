import { model, models, Schema } from 'mongoose';

const roomSchema = new Schema(
  {
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['single', 'double', 'twin', 'suite', 'deluxe', 'family'],
      required: true,
    },
    pricePerNight: { type: Number, required: true },
    information: { type: String, required: true },
    services: {
      bathroom: { type: [String], default: [] },
      accessibility: { type: [String], default: [] },
      entertainment: { type: [String], default: [] },
      foodAndDrink: { type: [String], default: [] },
      starsRating: { type: Number, min: 1, max: 5 },
      other: { type: [String], default: [] },
      internet: { type: [String], default: [] },
      bedroom: { type: [String], default: [] },
    },
    images: { type: [String], default: [] },
    maxOccupancy: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    roomNumber: { type: String, required: true },
  },
  { timestamps: true }
);

export const roomModel = models.Room || model('Room', roomSchema);

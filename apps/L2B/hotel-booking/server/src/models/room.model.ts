import { model, models, Schema } from 'mongoose';

const roomSchema = new Schema(
  {
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    name: { type: String },
    type: {
      type: String,
      enum: ['single', 'double', 'twin', 'suite', 'deluxe', 'family'],
      required: true,
    },
    pricePerNight: { type: Number },
    information: { type: [String] },
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
    roomNumber: { type: Number },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const roomModel = models.Room || model('Room', roomSchema);

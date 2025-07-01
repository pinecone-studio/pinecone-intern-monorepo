import { model, models, Schema } from 'mongoose';

const roomSchema = new Schema(
  {
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    name: { type: String, default: 'Room name' },
    type: {
      type: String,
      enum: ['single', 'double', 'twin', 'suite', 'deluxe', 'family'],
      required: true,
    },
    pricePerNight: { type: Number, default: 0 },
    information: { type: [String], default: [] },
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

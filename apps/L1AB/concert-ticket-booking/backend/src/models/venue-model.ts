import { model, models, Schema } from 'mongoose';

export type VenuesType = {
  _id: string;
  name: {
    nameType: string;
    quantity: number;
    price: number;
  }[];
  additional: string[];
  createdAt: Date;
  updatedAt: Date;
};
const VenueSchema = new Schema({
  name: {
    type: [
      {
        nameType: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  },
  additional: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const VenueModel = models['venues'] || model('venues', VenueSchema);

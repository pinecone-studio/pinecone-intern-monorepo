import { model, models, Schema } from 'mongoose';

export type Venuesype = {
  _id: string;
  name: string;
  price: number;
  additional: [string];
};
const VenueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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

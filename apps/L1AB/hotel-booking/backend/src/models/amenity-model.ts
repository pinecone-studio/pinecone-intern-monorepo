import mongoose, { model, Schema } from 'mongoose';

export type amenityType = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const amenitySchema = new Schema<amenityType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const amenityModel = mongoose.models.amenity || model('amenity', amenitySchema);

import mongoose, { model, Schema } from 'mongoose';

const amenitySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

export const amenityModel = mongoose.models.amenity || model('amenity', amenitySchema);

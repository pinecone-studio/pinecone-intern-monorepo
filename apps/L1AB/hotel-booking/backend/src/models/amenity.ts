import mongoose, { model, Schema } from 'mongoose';

const amenitySchema = new Schema({
  name: {
    type: String,
  },
});
export const amenityModel = mongoose.models.amenity || model('amenity', amenitySchema);

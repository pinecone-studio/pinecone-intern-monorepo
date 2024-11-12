import mongoose, { Schema, model } from 'mongoose';

const hotelAmenitiesSchema = new Schema(
  {
    hotelId: {
      type: Schema.ObjectId,
      ref: 'hotel',
      required: true,
    },
    amenities: [
      {
        type: Schema.ObjectId,
        ref: 'amenity',
      },
    ],
  },
  { timestamps: true }
);

export const hotelAmenitiesModel = mongoose.models.hotelAmenities || model('hotelAmenities', hotelAmenitiesSchema);

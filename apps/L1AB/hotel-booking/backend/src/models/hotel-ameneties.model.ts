import mongoose, { Schema, Types, model } from 'mongoose';
import { hotelType } from './hotel.model';
import { amenityType } from './amenity-model';

export type hotelAmenitiesType = {
  _id: string;
  amenities: Types.ObjectId[];
  hotelId: Types.ObjectId
  createdAt: Date;
  updatedAt: Date;
}

const hotelAmenitiesSchema = new Schema(
  {
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: 'hotel',
      required: true,
    },
    amenities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'amenity',
      },
    ],
  },
  { timestamps: true }
);

export type hotelAmenitiesPopulatedType = hotelAmenitiesType & {
  hotelId: hotelType
  amenitiesId: amenityType[];
};

export const hotelAmenitiesModel = mongoose.models.hotelAmenities || model('hotelAmenities', hotelAmenitiesSchema);

import { QueryResolvers } from '../../../generated';
import { hotelAmenitiesModel } from '../../../models';

export const getHotelIdByHotelAmenities: QueryResolvers['getHotelIdByHotelAmenities'] = async (_: unknown, { _id }) => {
  const hotelAmenities = await hotelAmenitiesModel.findOne({ hotelId: _id }).populate('amenities');
  console.log(hotelAmenities);

  if (!hotelAmenities) {
    throw new Error('Hotel amenities with the given ID not found.');
  }

  return hotelAmenities;
};

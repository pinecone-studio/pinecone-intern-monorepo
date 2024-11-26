import { QueryResolvers } from '../../../generated';
import { hotelModel } from '../../../models';
import { ObjectId } from 'mongodb';

export const getHotelById: QueryResolvers['getHotelById'] = async (_: unknown, { _id }) => {
  const hotels = await hotelModel.aggregate([
    {
      $match: { _id: new ObjectId(_id) },
    },
    {
      $lookup: {
        from: 'rooms',
        localField: '_id',
        foreignField: 'hotelId',
        as: 'rooms',
      },
    },
    {
      $lookup: {
        from: 'hotelamenities',
        localField: '_id',
        foreignField: 'hotelId',
        as: 'hotelAmenities',
        pipeline: [
          {
            $lookup: {
              from: 'amenities',
              localField: 'amenities',
              foreignField: '_id',
              as: 'amenities',
            },
          },
        ],
      },
    },
  ]);

  if (!hotels.length) {
    throw new Error('Hotel not found');
  }

  const hotel = {
    ...hotels[0],
    hotelAmenities: hotels[0].hotelAmenities[0] || null,
  };

  return hotel;
};

import { QueryResolvers } from '../../../generated';
import { HotelModel } from '../../../models';

export const getHotelsByPrice: QueryResolvers['getHotelsByPrice'] = async (_, { input }) => {
  const { type } = input;

  const order = type === 'asc' ? 1 : -1;

  const hotels = await HotelModel.aggregate([
    {
      $lookup: {
        from: 'rooms',
        localField: '_id',
        foreignField: 'hotelId',
        as: 'roomsData',
      },
    },
    {
      $addFields: {
        averagePrice: {
          $cond: {
            if: { $gt: [{ $size: '$roomsData' }, 0] },
            then: { $avg: '$roomsData.price' },
            else: 0,
          },
        },
      },
    },
    {
      $sort: { averagePrice: order },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
        phoneNumber: 1,
        rating: 1,
        starRating: 1,
        description: 1,
        images: 1,
        location: 1,
        locationName: 1,
        averagePrice: 1,
      },
    },
  ]);

  return hotels;
};

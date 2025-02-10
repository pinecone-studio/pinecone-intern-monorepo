import { BookingModel, RoomModel, HotelModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getAllQuerie: QueryResolvers['getAllQuerie'] = async (_, { input }) => {
  const { startDate, endDate, travellerCount, type } = input;

  // Get booked room IDs to avoid overlapping bookings
  const bookedRoomIds = await BookingModel.distinct('roomId', {
    $or: [{ startDate: { $lt: endDate }, endDate: { $gt: startDate } }],
  });

  // Get available rooms based on the traveller count and excluding booked rooms
  const rooms = await RoomModel.find({
    bed: travellerCount,
    _id: { $nin: bookedRoomIds },
  });

  const hotelIds = rooms.map((room) => room.hotelId);

  // Sort hotels by price
  const order = type === 'asc' ? 1 : -1;

  const hotels = await HotelModel.aggregate([
    {
      $match: {
        _id: { $in: hotelIds },
      },
    },
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
        amenities: 1,
      },
    },
  ]);

  return hotels;
};

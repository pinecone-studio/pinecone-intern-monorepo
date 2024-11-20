import { QueryResolvers } from '../../../generated';
import { hotelModel } from '../../../models';

export const getAllHotels: QueryResolvers['getAllHotels'] = async () => {
  try {
    const hotels = await hotelModel.aggregate([
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

    const transformedHotels = hotels.map((hotel) => ({
      ...hotel,
      hotelAmenities: hotel.hotelAmenities[0] || null,
    }));

    return transformedHotels;
  } catch (error) {
    throw new Error(`Failed to get all hotels`);
  }
};

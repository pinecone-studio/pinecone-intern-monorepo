import { MutationResolvers } from '../../../generated';
import { HotelModel } from '../../../models';

export const createHotel: MutationResolvers['createHotel'] = async (_, { input }) => {
  const { name, phoneNumber, rating, starRating, description, images, rooms, faqs, policies, about, location, locationName } = input;
  console.log(input);
  try {
    const newHotel = await HotelModel.create({
      name,
      phoneNumber,
      rating,
      starRating,
      description,
      images,
      rooms,
      faqs,
      policies,
      about,
      location,
      locationName,
    });
    return {
      code: 200,
      success: true,
      message: 'Hotel created successfully',
      hotel: newHotel,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: 'Failed to create hotel',
      hotel: undefined,
    };
  }
};

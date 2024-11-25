import { QueryResolvers } from "../../../generated";
import { hotelAmenitiesModel, hotelAmenitiesPopulatedType } from "../../../models";

export const getAllHotelAmenities: QueryResolvers['getAllHotelAmenities'] = async () => {
  try {
    const hotelAmenities = await hotelAmenitiesModel.find().populate<hotelAmenitiesPopulatedType>(['hotelId', 'amenities']);
    return hotelAmenities.map((hotelAmenity) => hotelAmenity.toObject());
  } catch (error) {
    throw new Error("Failed to get all hotel amenities");
  }
};

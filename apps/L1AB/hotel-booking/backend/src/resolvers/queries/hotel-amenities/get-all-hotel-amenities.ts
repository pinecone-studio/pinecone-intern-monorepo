import { QueryResolvers } from "../../../generated";
import { hotelAmenitiesModel } from "../../../models";

export const getAllHotelAmenities: QueryResolvers["getAllHotelsAmenities"] = async () => {
    try {
        const response = await hotelAmenitiesModel.find()
        return response
    } catch (error) {
        throw new Error("Failed to get all hotel amenities")
    }
}
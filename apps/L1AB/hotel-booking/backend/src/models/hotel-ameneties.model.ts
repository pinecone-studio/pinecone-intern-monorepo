import mongoose, {Schema, model} from "mongoose";


const hotelAmenitiesSchema = new Schema({

    hotel_id:{
        type:Schema.Types.ObjectId,
        ref: "hotel",
        required: true,
    },
    amenities:[{
        type: Schema.Types.ObjectId,
        ref:"amenity",
        required: true,
    }],
});

export const hotelAmenitiesModel =mongoose.models.hotelAmenities || model("hotelAmenities", hotelAmenitiesSchema)

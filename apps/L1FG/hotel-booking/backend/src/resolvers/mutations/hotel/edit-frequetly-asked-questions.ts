import { MutationResolvers } from "../../../generated";
import { HotelModel } from "../../../models";


export const editFaqs : MutationResolvers["editFaqs"] = async (_ , {input}) =>{
    const {id , faqs} = input;
    const hotel =await HotelModel.findById({_id : id});
    if(!hotel)
    {
        throw new Error("Hotel Not Found");
    }
    const updatedHotel =await HotelModel.findByIdAndUpdate({_id : id},{faqs}, {new : true});
    return updatedHotel;
}
import { QueryResolvers } from "../../../generated";
import { EventModel } from "../../../models";

 export const getAllEvents:QueryResolvers['getAllTickets'] = async()=>{
    const allEvents = await EventModel.find()
    return allEvents
};
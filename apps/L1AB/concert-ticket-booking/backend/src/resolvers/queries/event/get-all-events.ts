import { QueryResolvers } from "../../../generated";
import { EventModel, EventPopulatedType } from "../../../models";

 export const getAllEvents:QueryResolvers['getAllEvents'] = async()=>{
    const allEvents = await EventModel.find().populate<EventPopulatedType>('venues');
    if(!allEvents) throw new Error("No events");
    return allEvents
};
import dayjs from "dayjs"
import { QueryResolvers } from "@/graphql/generated";
import { LeaveRequestModel } from "@/graphql/model";
import { errorTypes, graphqlErrorHandler } from "../error";

export const getRequestByCalendarMonth: QueryResolvers['getRequestByCalendarMonth'] = async (_, { startDate }) => {
    try{
        const year = dayjs(startDate).year();
        const month = dayjs(startDate).month();

        const firstDayOfInputMonth = dayjs(new Date(year, month, 1));
        const weekDayOfInputMonth = firstDayOfInputMonth.day();

        const startDateOfMonth= 1 - weekDayOfInputMonth
        const leaveRequestsStartFrom = dayjs(new Date(year, month,)).add(startDateOfMonth, "day")
        
        const leaveRequestEndTo = dayjs(leaveRequestsStartFrom).add(35, "day")
    
        const getMonth = await LeaveRequestModel.find({
            startDate: {
                $gte: leaveRequestsStartFrom,
                $lte: leaveRequestEndTo
            }
        });
        return getMonth;
    }catch(error){
        throw graphqlErrorHandler({message: "Something went wrong"}, errorTypes.BAD_REQUEST)
    }
}

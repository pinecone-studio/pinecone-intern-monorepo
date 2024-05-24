import { startOfMonth, addDays } from 'date-fns';
import { QueryResolvers } from "@/graphql/generated";
import { LeaveRequestModel } from "@/graphql/model";
import { errorTypes, graphqlErrorHandler } from "../error";

export const getRequestByCalendarMonth: QueryResolvers['getRequestByCalendarMonth'] = async (_, { startDate, department }) => {
    try {
        const firstDayOfMonth = startOfMonth(startDate);
    
        const leaveRequestsStartFrom = addDays(firstDayOfMonth, -firstDayOfMonth.getDay());
        const leaveRequestEndTo = addDays(leaveRequestsStartFrom, 35);
    
        const getMonth = await LeaveRequestModel.find({
            startDate: {
                $gte: leaveRequestsStartFrom,
                $lte: leaveRequestEndTo
            },
            department: { $in: [department] }
        });
        return getMonth;
    } catch (error) {
        throw graphqlErrorHandler({ message: "Something went wrong" }, errorTypes.BAD_REQUEST)
    }
}

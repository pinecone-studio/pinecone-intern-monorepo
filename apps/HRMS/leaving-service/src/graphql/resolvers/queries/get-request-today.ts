import { QueryResolvers } from "@/graphql/generated";
import { LeaveRequestModel } from "@/graphql/model";
import { errorTypes, graphqlErrorHandler } from "../error";

export const getRequestToday: QueryResolvers['getRequestToday'] = async (_, {startDate} ) => {
    try {
        console.log(startDate);
        
        const daySlice = startDate.slice(0, 10);
        const startOfDay = new Date(daySlice);
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1);

        const getRequests = await LeaveRequestModel.find({
            startDate: { $gte: startOfDay, $lt: endOfDay }
        });

        return getRequests;
    } catch (error) {
        throw graphqlErrorHandler({ message: "Failed to fetch leave requests for today." }, errorTypes.BAD_REQUEST);
    }
}

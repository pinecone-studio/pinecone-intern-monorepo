import { QueryResolvers } from "@/graphql/generated";
import { LeaveRequestModel } from "@/graphql/model";
import { errorTypes, graphqlErrorHandler } from "../error";

export const getRequestByMonth: QueryResolvers['getRequestByMonth'] = async (_, { startDate }) => {
    try{
        const year = Number(startDate.slice(0, 4));
        const month = Number(startDate.slice(5, 7));
    
        const startDateOfMonth = new Date(year, month - 1, 1);
        const firstDateOfNextMonth = new Date(year, month, 1);
    
        const getMonth = await LeaveRequestModel.find({
            startDate: {
                $gte: startDateOfMonth,
                $lte: firstDateOfNextMonth
            }
        });
        return getMonth;
    }catch(error){
        throw graphqlErrorHandler({message: "Something went wrong"}, errorTypes.BAD_REQUEST)
    }
}

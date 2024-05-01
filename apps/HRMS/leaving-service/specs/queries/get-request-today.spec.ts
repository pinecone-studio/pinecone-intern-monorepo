import { errorTypes, graphqlErrorHandler } from "@/graphql/resolvers/error";
import { getRequestToday } from "@/graphql/resolvers/queries";
import { GraphQLResolveInfo } from "graphql";
import { LeaveRequestModel } from "../../src/graphql/model/leave-request";

jest.mock('../../src/graphql/model/leave-request');

describe("getRequestByMonth", () => {
    it('should return all leave request of specific day', async () => {
        const startDate = { startDate: "2024-05-31T12:00:00" };
        (LeaveRequestModel.find as jest.Mock).mockResolvedValueOnce([
            {
                _id: "662f2684b6c72f944f59cdb6",
                declinedReasoning: null,
                description: "medehgui ee medehgui",
                durationType: "Hour",
                employeeId: "employee0",
                endHour: 12,
                leaveType: "SHIT_HAPPENED",
                startDate: "2024-05-31T12:00:00",
                startHour: 9,
                status: "PENDING",
                superVisor: "Boss",
                totalHour: 3
            }
        ]);

        const result = await getRequestToday?.({}, startDate, {}, {} as GraphQLResolveInfo);
        
        expect(result).toEqual([{
            _id: "662f2684b6c72f944f59cdb6",
            declinedReasoning: null,
            description: "medehgui ee medehgui",
            durationType: "Hour",
            employeeId: "employee0",
            endHour: 12,
            leaveType: "SHIT_HAPPENED",
            startDate: "2024-05-31T12:00:00",
            startHour: 9,
            status: "PENDING",
            superVisor: "Boss",
            totalHour: 3
        }]);
    });

    it('should throw error', async () => {
        const startDate = { startDate: "2024-05-31T12:00:00" };

        (LeaveRequestModel.find as jest.Mock).mockRejectedValueOnce(new Error("Mocked error"));

        await expect(getRequestToday?.({}, startDate, {}, {} as GraphQLResolveInfo))
            .rejects.toEqual(graphqlErrorHandler({ message: "Failed to fetch leave requests for today." }, errorTypes.BAD_REQUEST));
    });
});

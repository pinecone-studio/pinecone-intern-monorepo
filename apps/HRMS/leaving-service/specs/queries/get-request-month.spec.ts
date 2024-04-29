import { errorTypes, graphqlErrorHandler } from "@/graphql/resolvers/error";
import { getRequestByMonth } from "@/graphql/resolvers/queries";
import { GraphQLResolveInfo } from "graphql";
import { LeaveRequestModel } from "../../src/graphql/model/leave-request";

jest.mock('../../src/graphql/model/leave-request');

describe("getRequestByMonth", () => {
    it('should return all leave request of specific month', async () => {
        const startDate = { startDate: "2024-05-22T01:00:00.000Z" };
        (LeaveRequestModel.find as jest.Mock).mockResolvedValueOnce([
            {
                _id: "662f2684b6c72f944f59cdb6",
                declinedReasoning: null,
                description: "medehgui ee medehgui",
                durationType: "Hour",
                employeeId: "employee0",
                endHour: 12,
                leaveType: "SHIT_HAPPENED",
                startDate: "2024-05-22T01:00:00.000Z",
                startHour: 9,
                status: "PENDING",
                superVisor: "Boss",
                totalHour: 3
            }
        ]);

        const result = await getRequestByMonth?.({}, startDate, {}, {} as GraphQLResolveInfo);
        
        expect(result).toEqual([{
            _id: "662f2684b6c72f944f59cdb6",
            declinedReasoning: null,
            description: "medehgui ee medehgui",
            durationType: "Hour",
            employeeId: "employee0",
            endHour: 12,
            leaveType: "SHIT_HAPPENED",
            startDate: "2024-05-22T01:00:00.000Z",
            startHour: 9,
            status: "PENDING",
            superVisor: "Boss",
            totalHour: 3
        }]);
    });

    it('should throw error', async () => {
        const startDate = { startDate: "2024-05-22T01:00:00.000Z" };

        (LeaveRequestModel.find as jest.Mock).mockRejectedValueOnce(new Error("Mocked error"));

        await expect(getRequestByMonth?.({}, startDate, {}, {} as GraphQLResolveInfo))
            .rejects.toEqual(graphqlErrorHandler({ message: "Something went wrong" }, errorTypes.BAD_REQUEST));
    });
});

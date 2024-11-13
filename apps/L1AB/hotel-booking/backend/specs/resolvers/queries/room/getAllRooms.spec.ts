import { roomModel } from "apps/L1AB/hotel-booking/backend/src/models";
import { getAllRooms } from "apps/L1AB/hotel-booking/backend/src/resolvers/queries";
import { GraphQLResolveInfo } from "graphql";

jest.mock("../../../../src/models", () => ({
    roomModel: {
        find: jest.fn().mockResolvedValueOnce({name: "uruu2"}).mockRejectedValueOnce("")
    }
}))

describe("get all rooms", () => {
    it("should get all rooms", async () => {
        const result = await getAllRooms!({}, {}, {} as any, {} as GraphQLResolveInfo)
        expect(result).toEqual({name: "uruu2"})
    })

    it("should return error", async () => {
        try {
            await getAllRooms!({}, {}, {} as any, {} as GraphQLResolveInfo)
        } catch (error) {
            if(error instanceof Error){
                expect(error.message).toBe("Failed to get all rooms")
            }
        }
    })
})
import { getRoomById } from "apps/L1AB/hotel-booking/backend/src/resolvers/queries";
import { GraphQLResolveInfo } from "graphql";

jest.mock("../../../../src/models", () => ({
    roomModel: {
        findById: jest.fn().mockResolvedValueOnce({_id: "2"}).mockRejectedValueOnce("")
    }
}))

describe("get all rooms", () => {
    it("should get all rooms", async () => {
        const result = await getRoomById!({}, {_id: "2"}, {} as any, {} as GraphQLResolveInfo)
        expect(result).toEqual({_id: "2"})
    })

    it("should return error", async () => {
        try {
            await getRoomById!({}, {_id: "2"}, {} as any, {} as GraphQLResolveInfo)
        } catch (error) {
            if(error instanceof Error){
                expect(error.message).toBe("Failed to get room by Id")
            }
        }
    })
})
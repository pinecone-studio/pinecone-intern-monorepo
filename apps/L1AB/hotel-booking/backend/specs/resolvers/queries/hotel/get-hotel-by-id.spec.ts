import { getHotelById } from "apps/L1AB/hotel-booking/backend/src/resolvers/queries/hotel";
import { GraphQLResolveInfo } from "graphql";

jest.mock("../../../../src/models", () => ({
    hotelModel: {
        findById: jest.fn().mockResolvedValueOnce({_id: "2"}).mockRejectedValueOnce("")
    }
}))

describe("get hotel", () => {
    it("should get hotel by id succesfully", async () => {
        const result = await getHotelById!({}, {_id: "2"}, {} as any, {} as GraphQLResolveInfo)
        expect(result).toEqual({_id: "2"})
    })

    it("should return error", async () => {
        try {
            await getHotelById!({}, {_id: "2"}, {} as any, {} as GraphQLResolveInfo)
        } catch (error) {
            if(error instanceof Error){
                expect(error.message).toBe("Failed to get hotel by id")
            }
        }
    })
})
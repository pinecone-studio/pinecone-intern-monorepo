import { getAllHotels } from "apps/L1AB/hotel-booking/backend/src/resolvers/queries/hotel";
import { GraphQLResolveInfo } from "graphql";

jest.mock("../../../../src/models", () => ({
    hotelModel: {
        find: jest.fn().mockResolvedValueOnce({_id: "2"}).mockRejectedValueOnce("")
    }
}))

describe("get all hotels", () => {
    it("should get all hotels succesfully", async () => {
        const result = await getAllHotels!({}, {}, {} as any, {} as GraphQLResolveInfo)
        expect(result).toEqual({_id: "2"})
    })

    it("should return error", async () => {
        try {
            await getAllHotels!({}, {}, {} as any, {} as GraphQLResolveInfo)
        } catch (error) {
            if(error instanceof Error){
                expect(error.message).toBe("Failed to get all hotels")
            }
        }
    })
})
import { getEventById } from "../../../..//src/resolvers/queries";
import { GraphQLResolveInfo } from "graphql";

jest.mock("../../../../src/models", () => ({
    EventModel: {
        findById: jest.fn().mockReturnValueOnce({
            populate:jest.fn().mockResolvedValue({
                _id:"1",
            }),
        })
        .mockReturnValueOnce({
            populate: jest.fn().mockResolvedValue(null),
        }),
    },
}));

describe("getEventById", () => {
    it("should get event by id", async () => {
      const event = await getEventById!({},{_id:"1"}, {name: "zul"}, {} as GraphQLResolveInfo)
      expect(event).toEqual({_id:'1'})
    })
});

it("should not get event  by id", async () => {
    try {
        await getEventById!({},{_id:"1"}, {name: "zul"}, {} as GraphQLResolveInfo)
    } catch (error) {
        expect(error).toEqual(new Error("Event not found"));
    }
})
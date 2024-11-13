import { getAllEvents,} from "../../../..//src/resolvers/queries";
import { GraphQLResolveInfo } from "graphql";

jest.mock("../../../../src/models", () => ({
    EventModel: {
        find: jest.fn().mockReturnValueOnce({
            populate:jest.fn().mockResolvedValue({
                _id:"1",
            }),
        })
        .mockReturnValueOnce({
            populate: jest.fn().mockResolvedValue(null),
        }),
    },
}));

describe("getAllEvent", () => {
    it("should get all event", async () => {
      if (getAllEvents) {
      const event = await getAllEvents({},{_id:"1"}, {name: "tu"}, {} as GraphQLResolveInfo)
      expect(event).toEqual({_id:'1'})
      }
    })
    
});


it("should not get all event", async () => {
    try {
      if (getAllEvents) {
      await getAllEvents({},{_id:"1"}, {name: "tu"}, {} as GraphQLResolveInfo)
      }
    } catch (error) {
        expect(error).toEqual(new Error("No events"));
    }
})
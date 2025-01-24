import { PostLikeModal } from "../../../src/models"
import { likeCount } from "../../../src/resolvers/user-post-type"
jest.mock("../../../src/models")
describe("Like count",()=>{
    it("Should get like count",async()=>{
        (PostLikeModal.find as jest.Mock).mockResolvedValue([
            {
                _id:'daf',
                userId:'ae',
                postId:'er'
            }
        ])
        const result=await likeCount({_id:'e'},{},{})
        expect(result).toBe(1)
    })
})

import { CommentModel } from "../../../src/models/comment.model"
import { commentCount } from "../../../src/resolvers/user-post-type"
jest.mock("../../../src/models/comment.model")
describe("Comment count",()=>{
    it('Should get data',async()=>{
        if(!commentCount)
        {
            return
        }
        (CommentModel.find as jest.Mock).mockResolvedValue([
            {
                _id:'1',
                userId:'hi',
                postId:'341',
                comment:'Hello'
            }
        ])
        const result=await commentCount({_id:'e'},{},{})
        expect(result).toBe(1)
    })
})
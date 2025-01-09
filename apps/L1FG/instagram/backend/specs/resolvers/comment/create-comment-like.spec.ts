import { GraphQLResolveInfo } from "graphql"
import { createCommentLike } from "../../../src/resolvers/mutations/comment/create-comment-like"

jest.mock('../../../src/models',()=>({
    CommentLikeModel: {
        create: jest.fn().mockReturnValue({
            input: {
                userId: "",
                commentId: ""
            }
        })
    }
}))

describe('create comment', ()=>{
    it('shoud be a comment', async()=>{
        const  input =  {
             userId:"",
             commentId: ""
        }

        const result = await createCommentLike!({}, { input }, {}, {} as GraphQLResolveInfo)

        expect(result).toEqual({
            input: {
                userId: "",
                commentId: ""
            }
        })
    })
})
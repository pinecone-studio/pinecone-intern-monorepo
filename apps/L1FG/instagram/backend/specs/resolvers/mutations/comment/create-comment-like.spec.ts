import { createCommentLike } from "apps/L1FG/instagram/backend/src/resolvers/mutations"
import { GraphQLResolveInfo } from "graphql"

jest.mock('apps/L1FG/instagram/backend/src/models',()=>({
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
import {  createPostLike } from "apps/L1FG/instagram/backend/src/resolvers/mutations"
import { GraphQLResolveInfo } from "graphql"

jest.mock('apps/L1FG/instagram/backend/src/models',()=>({
    PostLikeModal: {
        create: jest.fn().mockReturnValue({
            input: {
                userId:"",
                postId: ""
            }
        })
    }
}))

describe('create post', ()=>{
    it('shoud be a post', async()=>{
        const  input =  {
             userId:"",
                postId: ""
        }

        const result = await createPostLike!({}, { input }, {}, {} as GraphQLResolveInfo)

        expect(result).toEqual({
            input: {
                userId:"",
                postId: ""
            }
        })
    })
})
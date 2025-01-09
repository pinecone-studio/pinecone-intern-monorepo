import { createPost } from "apps/L1FG/instagram/backend/src/resolvers/mutations"
import { GraphQLResolveInfo } from "graphql"

jest.mock('../../../../src/models',()=>({
    PostModel: {
        create: jest.fn().mockReturnValue({
            input: {
                postImage: [""],
                userId:"",
                caption: "",
                carouselMediaCount: 0
            }
        })
    }
}))

describe('create post', ()=>{
    it('shoud be a post', async()=>{
        const  input =  {
            postImage: [""],
            userId:"",
            caption: "",
            carouselMediaCount: 0
        }

        const result = await createPost!({},{ input }, {}, {} as GraphQLResolveInfo)

        expect(result).toEqual({
            input: {
                postImage: [""],
                userId:"",
                caption: "",
                carouselMediaCount: 0
            }
        })
    })
})
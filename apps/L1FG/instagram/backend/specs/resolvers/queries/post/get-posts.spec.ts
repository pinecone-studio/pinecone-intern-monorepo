import { PostModel } from "apps/L1FG/instagram/backend/src/models"
import { getPosts } from "apps/L1FG/instagram/backend/src/resolvers/queries"
import { GraphQLResolveInfo } from "graphql"
jest.mock('apps/L1FG/instagram/backend/src/models')
describe("Get posts",()=>{
it("Should successfully get post",async()=>{
if(!getPosts)
    {
        return
    }    
(PostModel.find as jest.Mock).mockResolvedValue([
    {
        _id:'q12',
        postImage:['fasdf'],
        userId:'31234',
        carouselMediaCount:1
    }
])
const result=await getPosts({},{searchingUserId:'12'},{userId:'31'},{} as GraphQLResolveInfo)
expect(result).toEqual([
    {
        _id:'q12',
        postImage:['fasdf'],
        userId:'31234',
        carouselMediaCount:1
    }
])

})
it("Should throw an unauthorization error",async()=>{
    if(!getPosts)
        {
            return
        }    
    (PostModel.find as jest.Mock).mockResolvedValue([
        {
            _id:'q12',
            postImage:['fasdf'],
            userId:'31234',
            carouselMediaCount:1
        }
    ])
    await expect(getPosts({},{searchingUserId:'12'},{userId:null},{} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized')
})
})
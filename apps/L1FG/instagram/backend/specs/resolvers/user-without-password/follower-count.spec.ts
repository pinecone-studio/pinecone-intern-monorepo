
import { followerCount } from "../../../src/resolvers/user-without-password"
jest.mock('../../../src/models',()=>(
    {
        FollowerModel:{
            find:jest.fn().mockResolvedValue([])
        }
    }
))
describe('Follower count',()=>{
    it("get follower count",async()=>{
         const count=await followerCount({_id:''})
         expect(count).toBe(0)
    })
})
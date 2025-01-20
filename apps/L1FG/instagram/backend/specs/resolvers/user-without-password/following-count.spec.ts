import { followingCount } from "../../../src/resolvers/user-without-password";
jest.mock('../../../src/models',()=>(
    {
        FollowerModel:{
            find:jest.fn().mockResolvedValue([])
        }
    }
))
describe('Following count',()=>{
    it("Should get follower count",async()=>{
        const count=await followingCount({_id:''})
        expect(count).toBe(0)
    })
})
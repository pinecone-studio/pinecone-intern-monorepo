import { postCount } from "../../../src/resolvers/user-without-password"
jest.mock('../../../src/models',()=>(
    {
        PostModel:{
            find:jest.fn().mockResolvedValue([])
        }
    }
))
describe('Post count',()=>{
    it("get post count",async()=>{
         const count=await postCount({_id:''})
         expect(count).toBe(0)
    })
})
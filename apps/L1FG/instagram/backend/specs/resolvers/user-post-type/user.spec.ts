import { GraphQLResolveInfo } from "graphql"
import { UserModel } from "../../../src/models"
import { user } from "../../../src/resolvers/user-post-type"
jest.mock("../../../src/models")
describe("user",()=>{
    it('Should give an user',async()=>{
        if(!user)
        {
            return
        }
        (UserModel.findById as jest.Mock).mockResolvedValue(
            {
                userName:'asd',
                fullName:'afd'
            }
        )
        const parent ={
            userId:'fs',
            commentCount:2,
             likeCount:3,
             postImage:['fad']

        }
        const result=await user(parent,{},{userId:'er'},{} as GraphQLResolveInfo)
        expect(result).toEqual({
            userName:'asd',
            fullName:'afd'
        })
    })
})
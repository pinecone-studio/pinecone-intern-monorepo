import { createFollower } from "apps/L1FG/instagram/backend/src/resolvers/mutations"
import { GraphQLResolveInfo } from "graphql"

jest.mock('apps/L1FG/instagram/backend/src/models', ()=>({
    FollowerModel:{
        create: jest.fn().mockReturnValue({
            input: {
                followerId:"",
                targetId:""
            }
        })

    }
}))

describe('create follow', ()=>{
    it('should be a follower', async()=>{
        const input ={
        followerId:"",
        targetId:""
        }

        const result = await createFollower!({},{input},{},{} as  GraphQLResolveInfo)

        expect(result).toEqual({
            input: {
                followerId:"",
                targetId:""
            }
        })
    })
})
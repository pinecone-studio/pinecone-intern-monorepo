import { creteRequest } from "apps/L1FG/instagram/backend/src/resolvers/mutations";
import { GraphQLResolveInfo } from "graphql";

jest.mock('apps/L1FG/instagram/backend/src/models', ()=>({
    RequestModel: {
        create: jest.fn().mockReturnValue({
            input: {
                from: "",
                to: "",
                status: ""
            }
        })
    }
}))

describe('create request', ()=>{
    it('should be a request', async()=>{
        const input = {
                from: "",
                to:"",
                status: ""
        }

const result  = await creteRequest!({}, {input}, {}, {} as GraphQLResolveInfo)

expect(result).toEqual({
    input:{
        from: "",
        to:"",
        status: ""
    }
})
    })
})
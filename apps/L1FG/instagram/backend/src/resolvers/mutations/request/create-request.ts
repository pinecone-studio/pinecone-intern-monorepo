import { MutationResolvers } from "../../../generated";
import { RequestModel } from "../../../models";

export const creteRequest:MutationResolvers['creteRequest'] =(_, {input})=>{
const {from ,to, status} = input 

const request = RequestModel.create({
    from, to , status
})

 return request
}
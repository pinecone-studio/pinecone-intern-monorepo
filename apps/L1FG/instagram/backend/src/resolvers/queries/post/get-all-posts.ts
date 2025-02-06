import { QueryResolvers } from "../../../generated";
import { PostModel } from "../../../models";

export const getAllPosts:QueryResolvers['getAllPosts']=async(_,__,{userId})=>{
    if(!userId)
    {
        throw new Error("Unauthorized")
    }
const posts=await PostModel.find().sort({
    createdAt:-1
})
return posts

}
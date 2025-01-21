import { PostModel } from "../../models"

export const postCount=async({_id}:{_id:string})=>{
     const posts=await PostModel.find({
        userId:_id
     })
     const count=posts.length
     return count
}
import { FollowerModel } from "../../models"

export const followerCount=async({_id}:{_id:string})=>{
  const followers=await FollowerModel.find({target:_id})
  const count=followers.length
  return count
}

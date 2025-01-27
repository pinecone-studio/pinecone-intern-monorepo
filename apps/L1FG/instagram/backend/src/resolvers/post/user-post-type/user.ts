import { UserPostTypeResolvers } from "../../../generated";
import { UserModel } from "../../../models";

export const user:UserPostTypeResolvers['user']=async(parent,_,__)=>{
  const User=await UserModel.findById(parent.userId)
  return User
}
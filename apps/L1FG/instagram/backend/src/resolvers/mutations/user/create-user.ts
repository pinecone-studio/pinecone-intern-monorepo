import { MutationResolvers } from "../../../generated";
import { UserModel } from "../../../models";

export const createUser: MutationResolvers['createUser']=async(_, {input}) =>{
const {userName, fullName, bio, profileImage, gender, hasStory, isPrivate, password
 }= input

 const user = await UserModel.create({
    userName, fullName, bio, profileImage, gender, hasStory, isPrivate, password,
 })

return user 

}
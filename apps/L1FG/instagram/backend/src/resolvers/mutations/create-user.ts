import { MutationResolvers } from "../../generated";
import { UserModel } from "../../models/user.model";

export const createUser: MutationResolvers['createUser']=(_, {input}) =>{
const {userName, fullName, bio, profileImage, gender, hasStory, isPrivate, password
 }= input

 const user = UserModel.create({
    userName, fullName, bio, profileImage, gender, hasStory, isPrivate, password,
 })

return user 

}
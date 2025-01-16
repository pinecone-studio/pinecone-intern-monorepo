import { MutationResolvers } from "../../../generated";
import { UserModel } from "../../../models";

export const createUser: MutationResolvers['createUser']=async(_, {input}) =>{
const {userName,fullName,password,email}= input
 const user = await UserModel.create({
    userName, fullName, password,email
 })   
return user 
}
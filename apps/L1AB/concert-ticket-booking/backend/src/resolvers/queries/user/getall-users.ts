import { QueryResolvers } from "../../../generated";
import { userModel } from "../../../models";

export const getAllUsers: QueryResolvers ['getAllUsers']= async()=>{
    const AllUsers = await userModel.find()
    return AllUsers;
}